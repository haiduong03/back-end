import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { TSendMessageParams } from "./types/telegram.types";

@Injectable()
export class TelegramService {
    private readonly telegramBot: TelegramBot
    constructor(
        private readonly configService: ConfigService
    ) {
        this.telegramBot = new TelegramBot(
            this.configService.get('TELEGRAM_BOT_TOKEN')!, {
            polling: true
        });

        this.telegramBot.on("message", this.onMessage);
        this.telegramBot.on("gr", this.onMessage);
        this.sendMessage({ text: "Hello" })
    }

    onMessage(messages: Message) {
        console.log({ messages });
    }

    async sendMessage({ chatId = "-4615808631", text, options }: TSendMessageParams) {
        return await this.telegramBot.sendMessage(chatId, text, options);
    }
}
