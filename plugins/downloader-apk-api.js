import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let data;
    try {
        data = await (await fetch(`https://vihangayt.me/download/apk?id=${args[0]}`)).json();
        await m.reply('_In progress, please wait..._');
        conn.sendMessage(m.chat, { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name }, { quoted: m });
    } catch (error) {
        console.error('Error:', error.message);
        await m.reply('Failed to fetch APK information. Please try again later.');
    }
}

handler.help = ['apk'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(apk(dl)?)$/i;

export default handler;
