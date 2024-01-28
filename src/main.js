import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { config } from 'dotenv';
import { chatGPT } from './chatgpt.js'


config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {
  handlerTimeout: Infinity,
})

bot.command('start', (ctx) =>
  ctx.reply(
    'Привет, пирожок. Отправь текстовое сообщение с идеями бизнеса, а я помогу составить план осуществления.'
  )
)

bot.on(message('text'), async (ctx) => {
await chatGPT(ctx.message.text);
    ctx.reply(
        'ТЕСТОВОЕ'
      )
})

bot.launch()