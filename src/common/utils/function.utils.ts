import dayjs from "dayjs";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

export const writeLog = (data: any, fileName: string, typeFile = '.log') => {
    try {
        const folderDir = `${process.env.LOG_PATH}/${dayjs().format("YYYY-MM-DD")}`;
        if (!existsSync(folderDir)) {
            mkdirSync(folderDir);
        }
        const pathLogFile = join(folderDir, `${fileName}_${dayjs().unix()}${typeFile}`);
        writeFileSync(pathLogFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
}