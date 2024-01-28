import { Client } from "@notionhq/client";
import { config } from "dotenv";

config();

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export async function createInfo(short, text) {
  console.log(text, 'ТУТ ТЕКСТ');
  const dbResponse = await notion.pages.create({
    parent: { database_id: process.env.NOTION_DB_ID },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: short
            },
          },
        ],
      },
      Date: {
        date: {
          start: new Date().toISOString(),
        },
      },
    },
  });

  const pageResponse = await notion.blocks.children.append({
    block_id: dbResponse.id,
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: text,
              },
            },
          ],
        },
      },
    ],
  });

  return dbResponse;
}
