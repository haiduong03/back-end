import TelegramBot from "node-telegram-bot-api";

export type TSendMessageParams = {
    chatId?: Parameters<TelegramBot["sendMessage"]>[0];
    text: Parameters<TelegramBot["sendMessage"]>[1];
    options?: Parameters<TelegramBot["sendMessage"]>[2];
};