import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { STrSaleDtl } from "./STrSaleDtl.entity";
import { STrPayment } from "./STrPayment.entity";

@Entity('STr_Hdr')
export class STrHdr {
    @PrimaryColumn({ type: 'char', length: 20 })
    Trans_No: string;

    @Column({ type: 'datetime', default: () => "'1900-01-01'", nullable: true })
    Trans_Date: Date;

    @Column({ type: 'datetime', default: () => "'1900-01-01'", nullable: true })
    EfTran_Date: Date;

    @Column({ type: 'char', length: 12, nullable: true })
    Job_Code: string;

    @Column({ type: 'datetime', default: () => "'1900-01-01'", nullable: true })
    Job_Date: Date;

    @Column({ type: 'nvarchar', length: 15, nullable: true })
    Event_Item_Code: string;

    @Column({ type: 'int', default: 0, nullable: true })
    StkTrCls_ID: number;

    @Column({ type: 'nvarchar', length: 20, nullable: true })
    TrRef_No: string;

    @Column({ type: 'date', default: () => "'1900-01-01'", nullable: true })
    TrRef_Date: Date;

    @Column({ type: 'char', length: 2, nullable: true })
    TrRef_type: string;

    @Column({ type: 'int', default: 0 })
    Shift_No: number;

    @Column({ type: 'int', default: 0 })
    WS_ID: number;

    @Column({ type: 'nvarchar', length: 25 })
    Member_No: string;

    @Column({ type: 'int', default: 0, nullable: true })
    ExtObjCls_ID: number;

    @Column({ type: 'int', default: 0, nullable: true })
    ExtObj_ID: number;

    @Column({ type: 'int', default: 0, nullable: true })
    ExpStkClust_ID: number;

    @Column({ type: 'int', default: 0, nullable: true })
    ImpStkClust_ID: number;

    @Column({ type: 'char', length: 2, nullable: true })
    Delivery_Term: string;

    @Column({ type: 'int', default: 0, nullable: true })
    Deliverer_ID: number;

    @Column({ type: 'int', default: 0, nullable: true })
    Manifest_ID: number;

    @Column({ type: 'nvarchar', length: 20, nullable: true })
    DeliveryNote: string;

    @Column({ type: 'nvarchar', length: 20, nullable: true })
    Order_No: string;

    @Column({ type: 'int', default: 0, nullable: true })
    OrdDelivery_IDX: number;

    @Column({ type: 'nvarchar', length: 100, nullable: true })
    Remark: string;

    @Column({ type: 'bit', default: false, nullable: true })
    IsAuto: boolean;

    @Column({ type: 'int', default: 0, nullable: true })
    User_ID: number;

    @Column({ type: 'int', default: 0, nullable: true })
    Node_ID: number;

    @Column({ type: 'int', default: 0, nullable: true })
    SysUnit_ID: number;

    @Column({ type: 'int', default: 0, nullable: true })
    BU_ID: number;

    @Column({ type: 'char', length: 1, nullable: true })
    Process_Stat: string;

    @Column({ type: 'bit', default: false, nullable: true })
    isClosed: boolean;

    @Column({ type: 'int', default: 0, nullable: true })
    QtyPost_IDX: number;

    @Column({ type: 'int', default: 0, nullable: true })
    GLPost_IDX: number;

    @Column({ type: 'int', default: 0, nullable: true })
    Company_ID: number;

    @Column({ type: 'binary', length: 2, nullable: true })
    DayType_IDs: Buffer;

    @Column({ type: 'int', default: 0, nullable: true })
    Weather_ID: number;

    @Column({ type: 'int', default: 0, nullable: true })
    Temp_ID: number;

    @Column({ type: 'int', default: 0, nullable: true })
    SocialEvt_ID: number;

    @Column({ type: 'char', length: 2, nullable: true })
    Cust_Sex_Type: string;

    @Column({ type: 'int', default: 0, nullable: true })
    Age_ID: number;

    @Column({ type: 'bit', default: false, nullable: true })
    Disabled: boolean;

    @Column({ type: 'varchar', length: 10, nullable: true })
    Partition_Code: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    Random_Code: string;

    @Column({ type: 'nvarchar', length: 4 })
    STr_Reason_Code: string;

    @Column({ type: 'int', default: -1 })
    Copies: number;

    @OneToMany(() => STrSaleDtl, (sale: STrSaleDtl) => sale.hdr)
    @JoinColumn({ name: 'Trans_No', referencedColumnName: 'Trans_No' })
    sale: STrSaleDtl[];

    @OneToOne(() => STrPayment, (payment: STrPayment) => payment.hdr)
    @JoinColumn({ name: 'Trans_No', referencedColumnName: 'Trans_No' })
    payment: STrPayment;
}
