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
        const token = this.configService.get('TELEGRAM_BOT_TOKEN')!
        this.telegramBot = new TelegramBot(token, { polling: true, });
    }

    async sendMessage({ chatId, text, options }: TSendMessageParams) {
        return await this.telegramBot.sendMessage(chatId, text, options);
    }
}
