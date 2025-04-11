import dayjs from "dayjs";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

export const writeLog = (data: any, fileName: string, typeFile = '.log') => {
    try {
        const folderDir = `logs/${dayjs().format("YYYY-MM-DD")}`;
        if (!existsSync(folderDir)) {
            mkdirSync(folderDir);
        }
        const pathLogFile = join(folderDir, `${fileName}_${dayjs().format("HH-mms")}${typeFile}`);
        writeFileSync(pathLogFile, JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
}