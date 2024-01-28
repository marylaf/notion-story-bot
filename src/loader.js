export class Loader {
    icons = [
      '🕐','🕑','🕒',
      '🕓','🕔','🕕',
      '🕖','🕗','🕘',
      '🕙','🕚','🕛',
    ]
    interval = null
    message = null
  
    constructor(ctx) {
      this.ctx = ctx
    }
  
    async show() {
      let index = 0
      this.message = await this.ctx.reply(this.icons[index])
      this.interval = setInterval(() => {
        index = index < this.icons.length - 1 ? index + 1 : 0
        this.ctx.telegram.editMessageText(
          this.ctx.chat.id,
          this.message.message_id,
          null,
          this.icons[index]
        )
      }, 500)
    }
  
    hide() {
      this.ctx.telegram.deleteMessage(this.ctx.chat.id, this.message.message_id)
      clearInterval(this.interval)
    }
  }