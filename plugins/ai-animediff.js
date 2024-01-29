/*
import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let wm = global.me;

    if (!text) throw `This command generates an image from texts\n\n Example usage\n${usedPrefix + command} 1girl, blush, megane, school uniform`;
    await m.reply('*Processing image*');
    await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '🤓' } }, { messageId: m.key.id });

    try {
        const response = await fetch(`https://vihangayt.me/tools/photoleap?q=${text}`);
        const data = await response.json();

        if (!data.status) throw 'Failed to fetch image data from API';
        if (!data.data) throw 'Image URL not found in the API response';

        const url = data.data;
        await conn.sendFile(m.chat, await (await fetch(url)).buffer(), 'image.jpg', wm, m);
        m.react('🤳');
    } catch (e) {
        console.error(e);
        m.reply('❌ Error generating image');
    }
};

handler.help = ['aiimg <text>'];
handler.tags = ['ai'];
handler.command = /^(aiimg)$/i;

export default handler;
*/
