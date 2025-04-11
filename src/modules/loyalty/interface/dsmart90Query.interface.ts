import { STrHdr } from "@entities/dsmart90/STrHdr.entity";
import { STrPayment } from "@entities/dsmart90/STrPayment.entity";

export type TGetAllPaymentFailedByTime = typeof STrHdr & {
    payment: Pick<STrPayment, 'Request_Data'>;
} 