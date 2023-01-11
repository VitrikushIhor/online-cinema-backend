import { Telegraf } from "telegraf";
import { ITelegram } from "./telegram.interface";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";
export declare class TelegramService {
    bot: Telegraf;
    options: ITelegram;
    constructor();
    sendMessage(message: string, options?: ExtraReplyMessage, chatId?: string): Promise<void>;
    sendPhoto(photo: string, message?: string, chatId?: string): Promise<void>;
}
