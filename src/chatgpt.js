import OpenAI from "openai";
import { config } from "dotenv";

config();

const CHATGPT_MODEL = "gpt-3.5-turbo";

const ROLES = {
  ASSISTANT: "assistant",
  SYSTEM: "system",
  USER: "user",
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const getMessage = (m) =>
  `Напиши на основе списка продуктов и вкусовых предпочтений краткий рецепт блюда, который можно приготовить: ${m}.

Необходимо получить рецепт из того, что есть в холодильнике.
Этот рецепт должен быть современным, несложным в приготовлении, максимальное время готовки должно быть 40 минут.`;

export async function chatGPT(message = "") {
  const messages = [
    {
      role: ROLES.SYSTEM,
      content:
        "Ты опытный шеф-повар, который помогает выбрать, что можно приготовить из определенных продуктов.",
    },
    {
      role: ROLES.USER,
      content: getMessage(message),
    },
  ];
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages,
      model: CHATGPT_MODEL,
    });
    return chatCompletion.choices[0].message;
  } catch (error) {
    console.log("Error while chat completion", error.message);
  }
}
