import dayjs from "dayjs";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";
import { AxiosError } from "axios";

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

export const handleErrAPILoyalty = (error: any) => {
    let data: any = error;

    if (error instanceof AxiosError) {
        const dataLog = error.response?.data;
        const request = JSON.parse((error.toJSON() as any)?.['config']?.['data'])
        const status = error.response?.status;
        const statusText = error.response?.statusText;

        data = { status, statusText, dataLog, request };
    }

    writeLog(data, 'handleRetryLoyalty');
    console.log(error);
}