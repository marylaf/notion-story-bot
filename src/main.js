import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { config } from "dotenv";
import { chatGPT } from "./chatgpt.js";
import { createInfo } from "./notion.js";
import { Loader } from "./loader.js";

config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {
  handlerTimeout: Infinity,
});

bot.command("start", (ctx) =>
  ctx.reply(
    "Привет, пирожок! Перечисли продукты, которые у тебя есть в холодильнике, а также твои вкусовые предпочтения, и я помогу тебе определиться с тем, что можно приготовить."
  )
);

bot.on(message("text"), async (ctx) => {
  try {
    const text = ctx.message.text;
    if (!text.trim()) ctx.reply("Текст не может быть пустым");
    const loader = new Loader(ctx);
    loader.show();

    const response = await chatGPT(text);

    if (!response) return ctx.reply(`Ошибка с API. ${response}`);

    const notionResponse = await createInfo(text, response.content);
    loader.hide();
    ctx.reply(`Ваша страница: ${notionResponse.url}`);
  } catch (e) {
    console.log(`Error while proccessing gpt response`, e.message);
  }
});

bot.launch();
