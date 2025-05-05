import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { STrHdr } from "./STrHdr.entity";

@Entity("STr_Payment")
export class STrPayment {
    @PrimaryColumn({ type: "int", default: 0 })
    Pmt_IDX: number;

    @PrimaryColumn({ type: "varchar", length: 20, default: "" })
    Trans_No: string;

    @Column({ type: "datetime", default: () => "'1900-01-01'" })
    Trans_Date: Date;

    @Column({ type: "int", default: 0 })
    StkTrCls_ID: number;

    @Column({ type: "int", default: 0 })
    Pmt_ID: number;

    @Column({ type: "int", default: 0 })
    PmtIssuer_ID: number;

    @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
    Payment_Amt: number;

    @Column({ type: "char", length: 3, default: "" })
    Pmt_Cys: string;

    @Column({ type: "numeric", precision: 12, scale: 2, default: 0 })
    Pmt_ExcRate: number;

    @Column({ type: "int", default: 0 })
    User_ID: number;

    @Column({ type: "bit", default: false })
    Disabled: boolean;

    @Column({ type: "varchar", length: 10, default: "", nullable: true })
    Partition_Code: string;

    @Column({ type: "nvarchar", nullable: true })
    Request_Data: string;

    @Column({ type: "nvarchar", nullable: true })
    Response_Data: string;

    @Column({ type: "nvarchar", length: 30, default: "" })
    PayRef_No: string;

    @OneToOne(() => STrHdr, (hdr: STrHdr) => hdr.payment)
    @JoinColumn({ name: "Trans_No", referencedColumnName: "Trans_No" })
    hdr: STrHdr;
}