import dayjs from "dayjs";
import { appendFile, existsSync, mkdirSync, writeFile, writeFileSync } from "fs";
import { join } from "path";

export function LoggingCatch() {
    return function (
        _: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                return await original.apply(this, args);
            } catch (error) {
                const folderDir = `logs/${dayjs().format("YYYY-MM-DD")}`;
                if (!existsSync(folderDir)) {
                    mkdirSync(folderDir);
                }
                const pathLogFile = join(folderDir, `${propertyKey}_${dayjs().format("HH-mms")}.log`);
                console.log({ pathLogFile });
              
                writeFileSync(pathLogFile, JSON.stringify(error, null, 2));
                throw error;
            }
        };

        return descriptor;
    };
}
