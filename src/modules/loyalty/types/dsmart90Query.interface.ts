import { STrHdr } from "@entities/dsmart90/STrHdr.entity";
import { STrPayment } from "@entities/dsmart90/STrPayment.entity";

export type TGetAllPaymentFailedByTime = {
    payment: Pick<STrHdr, 'Trans_No'>;
} & {
    payment: Pick<STrPayment, 'Request_Data'>;
} 

export type TGetAllPaymentFailedByTimeInput = { startDate: string, endDate: string }