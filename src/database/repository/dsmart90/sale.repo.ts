import { Injectable } from "@nestjs/common";
import { STrSaleDtl } from "src/database/entity/dsmart90/STr_SaleDtl.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SaleRepository extends Repository<STrSaleDtl> {
    constructor(dataSource: DataSource) {
        super(STrSaleDtl, dataSource.createEntityManager());
    }
}