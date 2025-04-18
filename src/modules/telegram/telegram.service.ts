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
        // loyalty
        this.telegramBotLoyalty = new TelegramBot(
            this.configService.get('TELEGRAM_BOT_TOKEN_LOYALTY')!, {
            polling: true,
        });
        // app
        this.telegramBotApp = new TelegramBot(
            this.configService.get('TELEGRAM_BOT_TOKEN_APP')!, {
            polling: true,
        });

        // messages receive
        this.telegramBotLoyalty.on('message', this.onMassage);
        this.telegramBotApp.on('message', this.onMassage);
    }

    private onMassage(msg: Message) {
        this.logger.log(msg);
    }

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
