import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginFdsDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class TokenFdsDto {
    @ApiProperty()
    @IsString()
    @IsString()
    @IsNotEmpty()
    access_token: string;
}

export class ListTransportsInternalDto extends TokenFdsDto {
    @ApiProperty()
    skipCount: number;
    @ApiProperty()
    maxResultCount: number;
    @ApiProperty()
    sorting: string;
    @ApiProperty()
    isExportStore: boolean;
    @ApiProperty()
    filterText?: string;
    @ApiProperty()
    store: string;
    @ApiProperty()
    storeCode: string[];
    @ApiProperty()
    type: string;
    @ApiProperty()
    statusCode?: string;
    @ApiProperty()
    startDate: string;
    @ApiProperty()
    fromDate: string;
    @ApiProperty()
    endDate: string;
    @ApiProperty()
    toDate: string;
}

export class Stores {
    @ApiProperty()
    code: string;
    @ApiProperty()
    name: string;
}

export class InventoryTransfer {
    @ApiProperty()
    inventoryTransferDetails: InventoryTransferDetailDto[] = [];
    @ApiProperty()
    inventoryTransferProgresses: any = null;
    type: string;
    @ApiProperty()
    typeName: string;
    @ApiProperty()
    code: string;
    @ApiProperty()
    statusCode: string;
    @ApiProperty()
    statusName: string;
    @ApiProperty()
    fromStoreCode: string;
    @ApiProperty()
    fromStoreName: string;
    @ApiProperty()
    toStoreCode: string;
    @ApiProperty()
    toStoreName: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    goodsIssueId?: string | null;
    @ApiProperty()
    goodsIssueCode?: string | null;
    @ApiProperty()
    goodsReceiptId?: string | null;
    @ApiProperty()
    goodsReceiptCode?: string | null;
    @ApiProperty()
    purchaseRequestId?: string | null;
    @ApiProperty()
    purchaseRequestCode?: string | null;
    @ApiProperty()
    slipNo?: string | null;
    @ApiProperty()
    integrationFlow?: string | null;
    @ApiProperty()
    integrationGroupingKey?: string | null;
    @ApiProperty()
    tenantId?: string | null;
    @ApiProperty()
    creatorUserName: string;
    @ApiProperty()
    creatorFullName: string;
    @ApiProperty()
    creatorInfo: string;
    @ApiProperty()
    lastModifierUserName: string;
    @ApiProperty()
    lastModifierFullName: string;
    @ApiProperty()
    lastModifierInfo: string;
    @ApiProperty()
    lastModificationTime: Date;
    @ApiProperty()
    lastModifierId?: string | null;
    @ApiProperty()
    creationTime: Date;
    @ApiProperty()
    creatorId?: string | null;
    @ApiProperty()
    id: string;
}

export class InventoryTransferDetailDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    inventoryId: string;

    @ApiProperty()
    inventoryTransferId: string;

    @ApiProperty()
    productBarcode: string;

    @ApiProperty()
    productCode: string;

    @ApiProperty()
    productName: string;

    @ApiProperty()
    productNameEn: string;

    @ApiProperty()
    productShortName: string;

    @ApiProperty()
    productUnitCode: string;

    @ApiProperty()
    productUnitName: string;

    @ApiProperty()
    productCostFormulaTypeCode: string;

    @ApiProperty()
    productExpiryDateManagement: boolean;

    @ApiProperty()
    productUnitConvertions: string;

    @ApiProperty()
    transferQuantity: number;

    @ApiProperty()
    creatorId: string;

    @ApiProperty()
    creatorFullName: string;

    @ApiProperty()
    creatorUserName: string;

    @ApiProperty({ nullable: true })
    creatorInfo: any;

    @ApiProperty()
    creationTime: string;

    @ApiProperty({ nullable: true })
    lastModifierId: string | null;

    @ApiProperty({ nullable: true })
    lastModifierFullName: string | null;

    @ApiProperty({ nullable: true })
    lastModifierUserName: string | null;

    @ApiProperty({ nullable: true })
    lastModifierInfo: any;

    @ApiProperty({ nullable: true })
    lastModificationTime: string | null;

    @ApiProperty({ nullable: true })
    tenantId: string | null;
}


export class CommonListDto {
    @ApiProperty()
    @IsString()
    code: string;

    @ApiProperty()
    @IsString()
    groupCode: string;

    @ApiProperty()
    @IsString()
    name: string;
}

export class ExportInventoryTransferDetail extends IntersectionType(
    PickType(InventoryTransfer, ["code"] as const),
    PickType(
        InventoryTransferDetailDto, [
            "productCode",
            "productBarcode",
            "productName",
            "transferQuantity",
            "productUnitName"
        ] as const)
) {
    @ApiProperty()
    @IsString()
    creationTime: string;
 }