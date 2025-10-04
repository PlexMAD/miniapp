import TelegramBot from "node-telegram-bot-api";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "./generated/prisma/index.js";
import usersRouter from "./routes/users.ts";
import gameCategoriesRouter from "./routes/gameCategories.ts";
import gamesRouter from "./routes/games.ts";

dotenv.config();

// Telegram API Logic

const token = process.env.TG_BOT_KEY;
const webAppUrl = "https://miniapp.plexmad.ru/";
if (!token) {
  console.log("No TG Token found in env. Exiting.");
}
const bot = new TelegramBot(token || "TemplateToken", { polling: true });

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
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
const start = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`🚀 Server started on PORT ${PORT}`);
    });
  } catch (e) {
    console.error("❌ Error starting server:", e);
  }
};

start();

app.use("/users", usersRouter);
app.use("/gameCategories", gameCategoriesRouter);
app.use("/games", gamesRouter);
