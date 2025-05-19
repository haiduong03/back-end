import { HttpException, HttpStatus, Injectable, Logger, StreamableFile } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from "axios";
import dayjs from 'dayjs';
import { convert, HtmlToTextOptions } from 'html-to-text';
import puppeteer, { Browser, HTTPResponse, Page, SupportedBrowser } from "puppeteer";
import { ResponseList } from "src/common/type/common";
import { generateCSv, mapQueryUrl } from "src/common/utils/function.utils";
import { ExportInventoryTransferDetail, InventoryTransfer, ListTransportsInternalDto, LoginFdsDto } from "./dto/fds.dto";
@Injectable()
export class FdsService {
    private readonly _axiosInstance: AxiosInstance;
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {
        this._axiosInstance = axios.create({
            baseURL: this.configService.get('FDS_URL')!,
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-Type': "application/json",
            },
            timeout: 60000,
        })
    }

    async getTokenFds({ email, password }: LoginFdsDto) {
        const browser: Browser = await puppeteer.launch({
            browser: this.configService.get<string>('PUPPETEER_BROWSER') as SupportedBrowser,
            headless: true,
            defaultViewport: null,
            args: [
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--no-sandbox',
                '--ignore-certificate-errors'
            ],
            executablePath: this.configService.get<string>('PUPPETEER_PATH'),
            ignoreDefaultArgs: ['--disable-extensions'],
        });
        const page: Page = await browser.newPage();

        await page.setRequestInterception(true);
        page.on("request", (request) => request.continue());

        return new Promise<string>((resolve, reject) => {
            const urlFds = this.configService.get('FDS_URL_AUTH');
            const urlToken = urlFds + '/connect/token';
            const urlLogin = this.configService.get<string>('FDS_URL_LOGIN')!;
            const urlErr = 'Sai đăng nhập hoặc mật khẩu!'

            page.on("response", async (response: HTTPResponse) => {
                try {
                    if (response.url() === urlToken) {
                        const { access_token } = await response.json();
                        await browser.close();
                        resolve(access_token);
                    }
                    else if (response.url().includes(urlLogin)) {
                        try {
                            const options: HtmlToTextOptions = {
                                wordwrap: 130,
                            };
                            const html = await response.text();
                            const text = convert(html, options);
                            if (text.includes(urlErr)) {
                                await browser.close();
                                reject(
                                    new HttpException(
                                        urlErr,
                                        HttpStatus.BAD_REQUEST
                                    )
                                );
                            }
                        } catch (error) {
                            // don't need worry about this scope
                            this.logger.verbose({ v1: error });
                        }
                    }
                } catch (error) {
                    this.logger.verbose({ v2: error });
                    await browser.close();
                    reject(
                        new HttpException(
                            "BAD_REQUEST",
                            HttpStatus.BAD_REQUEST
                        )
                    );
                }
            });

            page.goto(urlLogin)
                .then(async () => {
                    await page.type("#LoginInput_UserNameOrEmailAddress", email);
                    await page.type("#LoginInput_Password", password);
                    const btn = "button[type='submit']";
                    await page.waitForSelector(btn);
                    await page.click(btn);
                });
        });
    }

    async loginFds({ email, password }: LoginFdsDto) {
        const getToken = await this.getTokenFds({ email, password })
        return { access_token: getToken };
    }

    async listTransportsInternal(access_token: string, body: ListTransportsInternalDto) {
        const data = Object.assign(body);
        delete data.access_token;
        
        const list = await this._axiosInstance.post(
            "/inv/api/app/inventory-transfer/get-list",
            data, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data: { data } }) => data) as ResponseList<InventoryTransfer>

        const result = {
            items: await Promise.all(list.items.map((item) => this.getDetailInventoryTransfer(access_token, item.id))),
            totalCount: list.totalCount
        } 
        return result;
    }

    async getStores(access_token: string, query = {
        skipCount: 0,
        maxResultCount: 1000,
        filterType: "REPORT_FILTER_TYPE.GEOGRAPHICAL_REGION"
    }) {
        return await this._axiosInstance.get(
            "/mdm/api/app/master-data/read/store-for-report?" + mapQueryUrl(query), {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data: { data } }) => data)
    }
  
    async getCommonList(access_token: string, query = {
        groupCodes: ["INVENTORY_TRANSFER_TYPE", "INVENTORY_TRANSFER_STATUS"],
    }) {
        return await this._axiosInstance.get(
            "/mdm/api/app/master-data/read/common-lists?" + mapQueryUrl(query), {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data: { data } }) => data)
    }

    async getDetailInventoryTransfer(access_token: string, id: string) { 
        return await this._axiosInstance.get(
            `/inv/api/app/inventory-transfer/${id}`, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }).then(({ data: { data } }) => data) as InventoryTransfer
    }

    async exportListTransportsInternal(access_token: string, body: ListTransportsInternalDto) { 
        try {
            let total = 0, skipCount = 0;
            let data: ExportInventoryTransferDetail[] = [];
            do {
                const list = await this.listTransportsInternal(access_token, { ...body, skipCount, maxResultCount: 1000 })
                skipCount += 1000;
                total = list.totalCount;
                data.push(...list.items.flatMap((item) =>
                    item.inventoryTransferDetails.map((detail) => ({
                        creationTime: dayjs(item.creationTime).format("YYYY-MM-DD HH:mm"),
                        code: item.code,
                        productCode: detail.productCode,
                        productBarcode: detail.productBarcode,
                        productName: detail.productName,
                        transferQuantity: detail.transferQuantity,
                        productUnitName: detail.productUnitName,
                    })))
                )
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } while (skipCount < total)
            const file = generateCSv(data);

            const stream = new StreamableFile(file, {
                type: 'text/csv',
                disposition: 'attachment; filename="report.csv"',
            });
            return stream;
        } catch (error) { 
            throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST)
        }
    }
}