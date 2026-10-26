
const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');

// የቴሌግራም ቦት ቶከንዎ
const BOT_TOKEN = '8868835776:AAHyTuITByfQFcj7RDpRqLJaR1mhMLpp70I';
const bot = new Telegraf(BOT_TOKEN);

const app = express();
// Render የሚሰጠውን ፖርት በራስ-ሰር እንዲቀበል ይደረጋል
const PORT = process.env.PORT || 3000;

// የፊት ገጽ (Frontend) ፋይሎች የሚገኙበት የ public ማህደር ማገናኘት
app.use(express.static(path.join(__dirname, 'public')));

// ሬንደር ላይ ዌብ ሰርቨሩ ሲከፈት የሚሰጠው ቋሚ ሊንክ
const WEB_APP_URL = process.env.RENDER_EXTERNAL_URL || 'https://gt-bingo-app-bot.onrender.com';

// ቦቱ ሲጀመር የሚሰጠው ምላሽ እና የዌብ አፕ አዝራር
bot.start((ctx) => {
    ctx.reply('እንኳን ደህና መጡ! 🎲 ጂቲ ቢንጎ (GT Bingo) ለመጫወት ከታች ያለውን አዝራር ይጫኑ።', 
        Markup.inlineKeyboard([
            [Markup.button.webApp('🎮 ጂቲ ቢንጎ 2026 ክፈት', WEB_APP_URL)]
        ])
    );
});

// ቦቱን ማስጀመር
bot.launch();

// ሰርቨሩን ማጀመር
app.listen(PORT, () => {
    console.log(`GT Bingo Server is running on port ${PORT}`);
});
