import { Injectable } from "@nestjs/common";
import { STrSaleDtl } from "@entities/dsmart90/STrSaleDtl.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SaleRepository extends Repository<STrSaleDtl> {
    constructor(dataSource: DataSource) {
        super(STrSaleDtl, dataSource.createEntityManager());
    }
}