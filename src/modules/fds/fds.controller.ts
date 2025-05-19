import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiOkResponse, ApiProduces } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { PaginatedResponse } from "src/common/decorators/response-list.decorator";
import { CommonListDto, InventoryTransfer, ListTransportsInternalDto, LoginFdsDto, Stores, TokenFdsDto } from "./dto/fds.dto";
import { FdsService } from "./fds.service";
import { Response } from "express";

@Controller('fds')
export class FdsController {
    constructor(
        private readonly fdsService: FdsService,
    ) { }

    @Post('login')
    @Throttle({ default: { limit: 50, ttl: 30000 } })
    @ApiOkResponse({ type: TokenFdsDto })
    async login(@Body() body: LoginFdsDto) {
       return await this.fdsService.loginFds(body);
    }


    @Post('list-transports-internal')
    @PaginatedResponse(InventoryTransfer)
    async listTransportsInternal(@Body() body: ListTransportsInternalDto) {
        return await this.fdsService.listTransportsInternal(body.access_token, { ...body });
    }

    @Post('stores')
    @PaginatedResponse(Stores)
    async getStores(@Body() body: TokenFdsDto) {
        return await this.fdsService.getStores(body.access_token);
    }

    @Post('common-list')
    @PaginatedResponse(CommonListDto)
    async getCommonList(@Body() body: TokenFdsDto) {
        return await this.fdsService.getCommonList(body.access_token);
    }
    
    @Post('list-transports-internal/export')
    @ApiOkResponse({ description: 'CSV file', schema: { type: 'string', format: 'binary' } })
    async exportListTransportsInternal(@Body() body: ListTransportsInternalDto) {
        return await this.fdsService.exportListTransportsInternal(body.access_token, { ...body });
    }
 }