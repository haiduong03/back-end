import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("Goods")
export class Goods {
    @PrimaryColumn({ type: "int", default: 0 })
    Goods_ID: number;

    @Column({ type: "varchar", length: 20, default: "" })
    Goods_Code: string;

    @Column({ type: "nvarchar", length: 60, default: "" })
    Short_Name: string;

    @Column({ type: "nvarchar", length: 60, default: "" })
    Full_Name: string;

    @Column({ type: "int", default: 0 })
    Goods_Div_ID: number;

    @Column({ type: "int", default: 0 })
    Goods_Class_ID: number;

    @Column({ type: "int", default: 0 })
    Goods_Grp_ID: number;

    @Column({ type: "int", default: 0 })
    Goods_AccCls_ID: number;

    @Column({ type: "int", default: 0 })
    Family_ID: number;

    @Column({ type: "int", default: 0 })
    GType_ID: number;

    @Column({ type: "bit", default: false })
    isSKUByQty: boolean;

    @Column({ type: "bit", default: false })
    isSKUByAmt: boolean;

    @Column({ type: "bit", default: false })
    isPurcItem: boolean;

    @Column({ type: "bit", default: false })
    isSaleItem: boolean;

    @Column({ type: "bit", default: false })
    isPromotion: boolean;

    @Column({ type: "bit", default: false })
    isExpiry: boolean;

    @Column({ type: "bit", default: false })
    Is4SaleOrder: boolean;

    @Column({ type: "bit", default: false })
    SOrder_Days: boolean;

    @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
    SOrder_MinQty: number;

    @Column({ type: "char", length: 3, default: "" })
    LifeTime_Code: string;

    @Column({ type: "bit", default: false })
    isWarranty: boolean;

    @Column({ type: "char", length: 3, default: "" })
    WarrTime_Code: string;

    @Column({ type: "bit", default: false })
    isLot: boolean;

    @Column({ type: "bit", default: false })
    isAutoLot: boolean;

    @Column({ type: "bit", default: false })
    isSerial: boolean;

    @Column({ type: "bit", default: false })
    isAutoSerial: boolean;

    @Column({ type: "int", default: 0 })
    PLU_ID: number;

    @Column({ type: "bit", default: false })
    isPLUbyCost: boolean;

    @Column({ type: "int", default: 0 })
    KIT_ID: number;

    @Column({ type: "int", default: 0 })
    Matrix_ID: number;

    @Column({ type: "int", default: 0 })
    Season_ID: number;

    @Column({ type: "int", default: 0 })
    GsBOM_ID: number;

    @Column({ type: "int", default: 0 })
    GAGrp_ID: number;

    @Column({ type: "bit", default: false })
    isOutOfList: boolean;

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
    SKUBase_Unit: number;

    @Column({ type: "int", default: 0 })
    SKUSubs_ID: number;

    @Column({ type: "int", default: 0 })
    SubsUnit_ID: number;

    @Column({ type: "char", length: 2, default: "" })
    Cost_Type: string;

    @Column({ type: "int", default: 0 })
    CostDueDay: number;

    @Column({ type: "bit", default: false })
    Disabled: boolean;

    @Column({ type: "datetime", nullable: true })
    StartSaleDate: Date;

    @Column({ type: "datetime", nullable: true })
    DueSaleDate: Date;
}
