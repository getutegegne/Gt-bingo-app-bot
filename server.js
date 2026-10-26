const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');

// የቴሌግራም ቦት ቶከን
const BOT_TOKEN = '8868835776:AAHyTuITByfQFcj7RDpRqLJaR1mhMLpp70I';
const bot = new Telegraf(BOT_TOKEN);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const WEB_APP_URL = process.env.RENDER_EXTERNAL_URL || 'https://gt-bingo-app-bot.onrender.com';

// ቦት ሲጀመር የሚመጣ ዋና ሜኑ (Start Menu)
bot.start((ctx) => {
    const firstName = ctx.from.first_name || 'ተጫዋች';
    ctx.reply(
        `ሰላም ${firstName}! 🎲 እንኳን ወደ **ጂቲ ቢንጎ (GT Bingo 2026)** በደህና መጡ! \n\n` +
        `መጫወት ለመጀመር፣ ሂሳብ ለመሙላት (Deposit) ወይም ለማውጣት (Withdraw) ከታች ያለውን አዝራር ይጫኑ።`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('🎮 ጂቲ ቢንጎን ክፈት (Open App)', WEB_APP_URL)],
            [Markup.button.callback('💳 ዲፖዚት (Telebirr)', 'DEPOSIT_INFO'), Markup.button.callback('🏧 ዊዝድራው', 'WITHDRAW_INFO')],
            [Markup.button.callback('📞 ቴሌግራም ቻናል / እርዳታ', 'HELP_INFO')]
        ])
    );
});

// የቴሌብር ዲፖዚት መረጃ
bot.action('DEPOSIT_INFO', (ctx) => {
    ctx.reply('💳 **የቴሌብር ዲፖዚት አደራረግ:**\n\n1. በቴሌብር ወደ 09xxxxxxx ገንዘብ ገቢ ያድርጉ።\n2. የትራንዛክሽን ቁጥሩን (Transaction ID) እና የተላከውን መጠን በዌብ አፑ የDeposit ክፍል ውስጥ ያስገቡ።');
});

// የዊዝድራው መረጃ
bot.action('WITHDRAW_INFO', (ctx) => {
    ctx.reply('🏧 **ገንዘብ ለማውጣት (Withdrawal):**\n\nበዌብ አፑ የትራንዛክሽን ክፍል ውስጥ ማውጣት የሚፈልጉትን መጠን እና የቴሌብር ስልክ ቁጥርዎን ያስገቡ።');
});

bot.action('HELP_INFO', (ctx) => {
    ctx.reply('📞 **እርዳታና ድጋፍ:**\n\nማንኛውም ጥያቄ ካለዎት አድሚኑን ያናግሩ።');
});

// ቦቱን ማስጀመር
bot.launch().then(() => console.log('Telegram Bot Started Successfully!'));

// ዌብ ሰርቨር ማስጀመር
app.listen(PORT, () => {
    console.log(`GT Bingo Server is running on port ${PORT}`);
});
