import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { LoginFdsDto, TokenFdsDto } from "./dto/fds.dto";
import { FdsService } from "./fds.service";

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


    @Get('list-transports-internal')
    async listTransportsInternal() {
        return await this.fdsService.listTransportsInternal('')
    }
 }