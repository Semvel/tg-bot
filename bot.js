const TelegramBot = require("node-telegram-bot-api");

// Замените на ваш токен
const TOKEN = "8009114347:AAELiLE6bLtwnJ0kVNsVXJtpXjuCgTqrj6k";

// Создаем бота с использованием токена
const bot = new TelegramBot(TOKEN, { polling: true });

// Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Привет! Напишите сообщение с тегом #review, чтобы выбрать случайного участника."
  );
});

// Обработка сообщений
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Проверяем наличие тега #review
  if (msg.text.includes("#review")) {
    try {
      // Получаем список участников чата
      const chatMembers = await bot.getChatAdministrators(chatId);
      const eligibleUsers = chatMembers.filter(
        (member) => member.user.id !== userId && !member.user.is_bot
      );

      if (eligibleUsers.length > 0) {
        const randomUser =
          eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];
        bot.sendMessage(
          chatId,
          `Случайный участник для review: @${randomUser.user.username}`
        );
      } else {
        bot.sendMessage(chatId, "Нет доступных участников для выбора.");
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(
        chatId,
        "Произошла ошибка при получении участников чата."
      );
    }
  }
});
