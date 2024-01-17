/*import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!/https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)/i.test(args[0])) throw m.reply(`Use example ${usedPrefix}${command} link`);
    await m.reply(`Ｌｏａｄｉｎｇ．．．`);
    let tes = await fetch(`https://vihangayt.me/download/instagram2?url=${args[0]}`);
            const json = await tes.json();
            const igdl = json.result;
            await conn.sendFile(m.chat, igdl, 'error.mp4', '❤️ done here', m);
}

handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?|insta|instagram(dl)?)$/i

export default handler
*/

import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!/https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)/i.test(args[0])) throw m.reply(`Use example ${usedPrefix}${command} link`);
    await m.reply(`Ｌｏａｄｉｎｇ．．．`);
    let data;
 try{ data= await (await fetch(`https://vihangayt.me/download/instagram2?url=${args[0]}`)).json();}
 return conn.sendMessage(m.chat, {video : {url : data.result[0] },caption: cap, }, m);
}

handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(ig(dl)?|insta|instagram(dl)?)$/i

export default handler
