import { Logger, Module } from '@nestjs/common';
import { FdsController } from "./fds.controller";
import { FdsService } from "./fds.service";

@Module({
    controllers: [FdsController],
    exports: [FdsService],
    providers: [
        FdsService,
        Logger,
    ],
})
export class FdsModule { }
