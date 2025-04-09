import { Injectable } from "@nestjs/common";
import { Goods } from "src/database/entity/dsmart90/Goods.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class GoodRepository extends Repository<Goods> {
    constructor(dataSource: DataSource) {
        super(Goods, dataSource.createEntityManager());
    }

   
}