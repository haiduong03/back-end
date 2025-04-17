import { STrHdr } from "@entities/dsmart90/STrHdr.entity";
import { Injectable } from "@nestjs/common";
import { TGetAllPaymentFailedByTime } from "src/modules/loyalty/types/dsmart90Query.interface";
import { Between, DataSource, IsNull, Raw, Repository } from "typeorm";

@Injectable()
export class HdrRepository extends Repository<STrHdr> {
    constructor(dataSource: DataSource) {
        super(STrHdr, dataSource.createEntityManager());
    }
    
    async getAllPaymentFailedByTime({ startDate, endDate }: { startDate: Date, endDate: Date }) {
        return (await this.find({
            select: {
                payment: {
                    Request_Data: true
                },
            },
            where: {
                EfTran_Date: Between(startDate, endDate),
                payment: {
                    Pmt_ID: 2,
                    Response_Data: IsNull(),
                }
            },
            relations: {
                payment: true,
            },
        })) as unknown as TGetAllPaymentFailedByTime[]
    }
}