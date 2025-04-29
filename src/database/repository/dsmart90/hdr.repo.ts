import { STrHdr } from '@entities/dsmart90/STrHdr.entity';
import { Injectable } from '@nestjs/common';
import { TGetAllPaymentFailedByTime, TGetAllPaymentFailedByTimeInput } from 'src/modules/loyalty/types/dsmart90Query.interface';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class HdrRepository extends Repository<STrHdr> {
    constructor(dataSource: DataSource) {
        super(STrHdr, dataSource.createEntityManager());
    }

    async getAllPaymentFailedByTime({ startDate, endDate }: TGetAllPaymentFailedByTimeInput) {
        return await this.createQueryBuilder('Hdr')
            .select([
                'Hdr.Trans_No',
                'Payment.Request_Data',
            ])
            .leftJoin('Hdr.payment', 'Payment')
            .leftJoin('Hdr.sale', 'Sale')
            .andWhere('Payment.Pmt_IDX = :payment', { payment: 2 })
            .andWhere('Payment.Response_Data IS NULL')
            .andWhere('Sale.EfTran_Date >= :startDate', { startDate })
            .andWhere('Sale.EfTran_Date <= :endDate', { endDate })
            .addGroupBy('Hdr.Trans_No')
            .addGroupBy('Payment.Request_Data')
            .addGroupBy('Payment.Pmt_IDX')
            .getMany() as TGetAllPaymentFailedByTime[]
    }
}