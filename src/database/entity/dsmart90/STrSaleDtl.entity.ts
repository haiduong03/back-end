import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Goods } from "./Goods.entity";
import { STrHdr } from "./STrHdr.entity";

@Entity("STr_SaleDtl")
export class STrSaleDtl {
    @PrimaryColumn({ type: "char", length: 20, default: "" })
    Trans_No: string;

    @Column({ type: "datetime", default: () => "'1900-01-01'", nullable: true })
    Trans_Date: Date;

    @Column({ type: "int", default: 0, nullable: true })
    Shift_No: number;

    @Column({ type: "int", default: 0, nullable: true })
    StkTrCls_ID: number;

    @Column({ type: "datetime", default: () => "'1900-01-01'", nullable: true })
    EfTran_Date: Date;

    @Column({ type: "int", default: 0 })
    Stk_ID: number;

    @Column({ type: "bit", default: false, nullable: true })
    isSKUIn: boolean;

    @Column({ type: "int", default: 0 })
    Item_IDX: number;

    @Column({ type: "int", default: 0, nullable: true })
    Goods_ID: number;

    @Column({ type: "char", length: 12, default: "", nullable: true })
    SKU_Code: string;

    @Column({ type: "float", default: 0, nullable: true })
    SKUBase_Qty: number;

    @Column({ type: "int", default: 0, nullable: true })
    SKUBaseUnit_ID: number;

    @Column({ type: "int", default: 0, nullable: true })
    SKUStat_ID: number;

    @Column({ type: "float", default: 0, nullable: true })
    Sales_Amt: number;

    @Column({ type: "float", default: 0, nullable: true })
    VAT_Amt: number;

    @Column({ type: "float", default: 0, nullable: true })
    Direct_Disc_Amt: number;

    @Column({ type: "float", default: 0, nullable: true })
    Indirect_Disc_Amt: number;

    @Column({ type: "float", default: 0, nullable: true })
    Cost_Amt: number;

    @Column({ type: "int", default: 0, nullable: true })
    User_ID: number;

    @Column({ type: "bit", default: false, nullable: true })
    Disabled: boolean;

    @Column({ type: "varchar", length: 10, default: "", nullable: true })
    Partition_Code: string;

    @Column({ type: "nvarchar", length: 4, default: "" })
    STr_Reason_Code: string;

    @Column({ type: "int", default: 0 })
    WS_ID: number;

    @Column({ type: "int", default: 0 })
    Tax_ID: number;

    @Column({ type: "int", default: 0 })
    KIT_ID: number;

    @Column({ type: "int", default: 0, nullable: true })
    PProg_ID: number;

    @ManyToOne(() => STrHdr, (hdr: STrHdr) => hdr.sale)
    @JoinColumn({ name: "Trans_No", referencedColumnName: "Trans_No" })
    hdr: STrHdr;

    @OneToOne(() => Goods, (goods: Goods) => goods.sale)
    @JoinColumn({ name: "Goods_ID", referencedColumnName: "Goods_ID" })
    goods: Goods;
}