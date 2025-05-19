import dayjs from "dayjs";
import dotenv from "dotenv";
import { createWriteStream, existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { TQueryPrams } from "../type/common";
import { createObjectCsvStringifier } from "csv-writer";

dotenv.config();

export const writeLog = (data: any, fileName: string, typeFile = '.log') => {
    try {
        const folderDir = `${process.env.LOG_PATH}/${dayjs().format("YYYY-MM-DD")}`;
        if (!existsSync(folderDir)) {
            mkdirSync(folderDir);
        }
        const pathLogFile = join(folderDir, `${fileName}_${dayjs().format('HH-mm')}${typeFile}`);
        writeFileSync(pathLogFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
}

export const handleErrAPILoyalty = (error: any, name = 'handleRetryLoyalty') => {
    let data: any = error;

    // if (error instanceof AxiosError) {
    //     const dataLog = error.response?.data;
    //     const request = JSON.parse((error.toJSON() as any)?.['config']?.['data'])
    //     const status = error.response?.status;
    //     const statusText = error.response?.statusText;

    //     data = { status, statusText, dataLog, request };
    // }

    writeLog(data, name);
    console.log(error);
}

export const mapQueryUrl = (params: TQueryPrams) =>
    Object.entries(params).map(([key, value]) =>
        Array.isArray(value)
            ? value.map((value) => `${key}=${value}`).join('&') :
            `${key}=${value}`).join('&')

// export const generateCSv = (data: any[], fileName: string) => {
//     if (!data || data.length === 0) return new Error('No data to write to CSV');
    
//     const outputStream = createWriteStream(`${fileName}.csv`);
//     const csvStringifier = createObjectCsvStringifier({
//         header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
//     });
//     const header = csvStringifier.getHeaderString();
//     outputStream.write(header);

//     do {
//         const chunk = data.splice(0, 1000);
//         const csvString = csvStringifier.stringifyRecords(chunk);
//         outputStream.write(csvString);
//     } while (data.length > 0)
    
//     outputStream.end();
// }

export const generateCSv = (data: any[]): Buffer => {
    if (!data || data.length === 0) throw new Error('No data to write to CSV');

    const csvStringifier = createObjectCsvStringifier({
        header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
    });

    const header = csvStringifier.getHeaderString();
    const chunks = [header];

    let remaining = [...data]; // Don't mutate original data
    while (remaining.length) {
        const chunk = remaining.splice(0, 1000);
        const csvChunk = csvStringifier.stringifyRecords(chunk);
        chunks.push(csvChunk);
    }

    return Buffer.from(chunks.join(''), 'utf8');
  };