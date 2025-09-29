const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
require("dotenv").config()
// Telegram API Logic
const token = process.env.TG_BOT_KEY;
const webAppUrl = "https://miniapp.plexmad.ru/";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже кнопка", {
      reply_markup: {
        inline_keyboard: [[{ text: "Кнопка", web_app: { url: webAppUrl } }]],
      },
    });
    await bot.sendMessage(chatId, "Делай", {
      reply_markup: {
        keyboard: [[{ text: "Кнопка вау", web_app: { url: webAppUrl } }]],
      },
    });
  }
});

// Node.Js Logic
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("200 return");
});

app.listen(PORT, () => {
  console.log("App started on PORT", PORT);
});
