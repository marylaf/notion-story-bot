import OpenAI from 'openai';
import { config } from 'dotenv';

config();

const CHATGPT_MODEL = 'gpt-3.5-turbo';

const ROLES = {
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    USER: 'user',
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});


const getMessage = (m) => 
`Напиши на основе этих идей последовательный подробный план осуществления бизнеса: ${m}.

Необходимо получить план реализации бизнеса в условиях 2024 года. Рассматриваем реализацию именно в России.
Этот план должен быть настолько эффективным, что потом я смогу сделать уже реальный бизнес и получать с него доход.`


export async function chatGPT(message = '') {
    const messages = [{
        role: ROLES.SYSTEM,
        content:
        'Ты опытный бизнес-аналитик, который помогает писать подробный план разработки идеи бизнеса.', 
    },
    {
        role: ROLES.USER,
        content: getMessage(message),
    }
    ];
try {
    const chatCompletion = await openai.chat.completions.create({
        messages,
        model: CHATGPT_MODEL,
      });
    console.log(chatCompletion.choices[0].message, 'ПРОВЕРКА');
      
} catch (error) {
    console.log('Error while chat completion', error.message);
}
  }

// export async function chatGPT(message = '') {
//   const messages = [
//     {
//       role: ROLES.SYSTEM,
//       content:
//         'Ты опытный копирайтер, который пишет краткие эмоциональные статьи для соц сетей.',
//     },
//     { role: ROLES.USER, content: getMessage(message) },
//   ]
//   try {
//     const completion = await openai.chat.completions.create({
//       messages,
//       model: CHATGPT_MODEL,
//     })
//     console.log(completion.choices[0].message, 'ПРОВЕРКА');
//     // return completion.choices[0].message
//   } catch (e) {
//     console.error('Error while chat completion', e.message)
//   }
// }