import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export type TQueryPrams = {
    skipCount?: number,
    maxResultCount?: number,
} & Record<string, any>


export class ResponseList<T> {
    @ApiProperty({ isArray: true })
    items: T[];

    @ApiProperty()
    totalCount: number;
}