import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("GoodsGrp")
export class GoodsGrp {
    @PrimaryColumn({ type: "int", default: 0 })
    GGrp_ID: number;

    @Column({ type: "nvarchar", length: 8, default: "" })
    GGrp_Code: string;

    @Column({ type: "nvarchar", length: 20, default: "" })
    GGrp_Name: string;

    @Column({ type: "nvarchar", length: 20, default: "" })
    ItemGrpSet_Code: string;

    @Column({ type: "int", default: 0 })
    GGrp_Level: number;

    @Column({ type: "int", default: 0 })
    ParentGrp_ID: number;

    @Column({ type: "bit", default: false })
    Last_Level: boolean;

    @Column({ type: "int", default: 0 })
    GType_ID: number;

    @Column({ type: "int", default: 0 })
    Tax_ID: number;

    @Column({ type: "nvarchar", default: "" })
    Image: string;

    @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
    GrossMargin: number;

    @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
    MinGrossMargin: number;

    @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
    MaxGrossMargin: number;

    @Column({ type: "int", default: 0 })
    Decimal: number;

    @Column({ type: "bit", default: false })
    Disabled: boolean;
}
