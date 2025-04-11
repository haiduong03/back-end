import { STrPayment } from "@entities/dsmart90/STrPayment.entity";
import { Injectable } from "@nestjs/common";
import { DataSource, IsNull, Repository } from "typeorm";

@Injectable()
export class PaymentRepository extends Repository<STrPayment> {
    constructor(dataSource: DataSource) {
        super(STrPayment, dataSource.createEntityManager());
    }
}