import { STrHdr } from "@entities/dsmart90/STrHdr.entity";
import { STrPayment } from "@entities/dsmart90/STrPayment.entity";

export type TGetAllPaymentFailedByTime = STrHdr & {
    payment: Pick<STrPayment, 'Request_Data'>;
} 

export type TGetAllPaymentFailedByTimeInput = { startDate: Date | string, endDate: Date | string }