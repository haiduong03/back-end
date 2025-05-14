import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from "axios";
import { convert, HtmlToTextOptions } from 'html-to-text';
import puppeteer, { Browser, HTTPResponse, Page, SupportedBrowser } from "puppeteer";
import { LoginFdsDto } from "./dto/fds.dto";
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
            const urlFds = this.configService.get('FDS_URL');
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

    async listTransportsInternal(access_token: string) {
        return await this._axiosInstance.get(
            "/api/transport-service/transport/GetTransportList", {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        }
        ).then(({ data }) => data)
    }
}