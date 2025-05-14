import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { OnEvent } from "@nestjs/event-emitter";
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { EVENT_EMIT } from "./enum/event-emit.enum";

@Injectable()
export class TelegramService {
    private readonly telegramBotLoyalty: TelegramBot
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
        if (this.configService.get('NODE_ENV') === 'production') {
            // loyalty
            this.telegramBotLoyalty = new TelegramBot(
                this.configService.get('TELEGRAM_BOT_TOKEN_LOYALTY')!,
                option
            );
            // messages receive
            this.telegramBotLoyalty.on('message', this.onMassage);
            // check connected
            this.telegramBotLoyalty.sendMessage('1421913123', 'connected')
        }
    }

    private onMassage = (msg: Message) => this.logger.log(msg);

    @OnEvent(EVENT_EMIT.MESSAGE_LOYALTY_RETRY)
    async sendMessageLoyalty(text: string) {
        await this.telegramBotLoyalty.sendMessage(
            this.configService.get('TELEGRAM_CHAT_ID_LOYALTY')!,
            text, {
            message_thread_id: this.configService.get('TELEGRAM_TOPIC_ID_LOYALTY'),
        });
    }
}
