const { Telegraf } = require('telegraf');
const http = require('http');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("خطأ: BOT_TOKEN غير موجود في متغيرات البيئة!");
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply("እንኳን ወደ Ethio Bingo Pro በደህና መጡ! ጨዋታውን ለመጀመር ከታች ያለውን ሊንክ ይጫኑ።");
});

bot.on('web_app_data', (ctx) => {
  const data = ctx.webApp.data.json();
  if (data.action === "withdraw_request") {
    const adminChatId = process.env.ADMIN_CHAT_ID;
    if (adminChatId) {
      const msg = `🔔 **አዲስ የዊዝድሮ ጥያቄ መጥቷል!**\n\n👤 ስም: ${data.username}\n📞 ስልክ: ${data.phone}\n💰 መጠን: ${data.amount} ETB\n🏦 ባንክ: ${data.bankType}\nአካውንት: ${data.accountNumber}`;
      bot.telegram.sendMessage(adminChatId, msg, { parse_mode: 'Markdown' });
    }
  }
});

bot.launch().then(() => {
  console.log("Bingo Bot is running successfully!");
});

// HTTP Server for Render Port Binding
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bingo Bot and WebApp are Running Live!\n');
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Web server running on port ${PORT}`);
});
