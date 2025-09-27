const TelegramBot = require('node-telegram-bot-api');

const token = '7695137489:AAFGRuN9ECFPf9VhO72Bj_LhmCOBiL1Zbf8';
const webAppUrl = "https://ya.ru"
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if (text === "/start") {
        await bot.sendMessage(chatId, "Ниже кнопка", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Кнопка", web_app: { url: webAppUrl } },]
                ]
            }
        })
        await bot.sendMessage(chatId, "Делай", {
            reply_markup: {
                keyboard: [
                    [{ text: "Кнопка вау", web_app: { url: webAppUrl } }]
                ]
            }
        })
    }
});
// const PORT = 5000;

// const app = express()

// app.get("/", (req, res) => {
//     res.status(200).json("200 return")
// })

// app.listen(PORT, () => { console.log("App started") })