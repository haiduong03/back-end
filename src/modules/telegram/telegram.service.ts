import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { OnEvent } from "@nestjs/event-emitter";
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { EVENT_EMIT } from "./enum/event-emit.enum";

@Injectable()
export class TelegramService {
    private readonly telegramBotLoyalty: TelegramBot
    private readonly telegramBotApp: TelegramBot
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {
        const option = {
            polling: true,
            request: {
                agentOptions: {
                    keepAlive: true,
                    family: 4
                },
                url: "https://api.telegram.org",
            }
        }
        // loyalty
        this.telegramBotLoyalty = new TelegramBot(
            this.configService.get('TELEGRAM_BOT_TOKEN_LOYALTY')!,
            option
        );
        // app
        this.telegramBotApp = new TelegramBot(
            this.configService.get('TELEGRAM_BOT_TOKEN_APP')!,
            option
        );

        // messages receive
        this.telegramBotLoyalty.on('message', this.onMassage);
        this.telegramBotApp.on('message', this.onMassage);

        // polling error
        this.telegramBotLoyalty.on('polling_error', this.polingError);
        this.telegramBotApp.on('polling_error', this.polingError);
    }

    private onMassage = (msg: Message) => this.logger.log(msg);
    private polingError = (err: any) => this.logger.error(err);

    @OnEvent(EVENT_EMIT.MESSAGE_LOYALTY_RETRY)
    async sendMessageLoyalty(text: string) {
        await this.telegramBotLoyalty.sendMessage(
            this.configService.get('TELEGRAM_CHAT_ID_LOYALTY')!,
            text, {
            message_thread_id: this.configService.get('TELEGRAM_TOPIC_ID_LOYALTY')!,
        }
        );
    }

    @OnEvent(EVENT_EMIT.MESSAGE_ERROR_APP)
    async sendErrAppMessage(text: string) {
        await this.telegramBotApp.sendMessage(
            this.configService.get('TELEGRAM_CHAT_ID_APP')!,
            text
        );
    }
}
