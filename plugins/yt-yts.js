import yts from 'yt-search';
import fs from 'fs';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'What are you looking for?';
  //await conn.reply(m.chat, global.wait, m);
  let results = await yts(text);
  let videos = results.videos.splice(0, 20);

  if (videos.length < 1) {
    return await conn.sendReply('*No results found!*', m);
  }

  let list = `_*Search results for ${text}:*_\n\n`;
  let index = 0;

  for (let video of videos) {
    const url = video.url;
    const title = video.title;
    const duration = video.duration.timestamp;

    if (title && duration) {
      index++;
      list += `${index}. *_${title} (${duration})_* _( ${url} )_\n`;
    }
  }

  conn.sendFile(m.chat, videos[0].thumbnail, 'yts.jpeg', list, m);
};

handler.help = ['yts <query>'];
handler.tags = ['downloader'];
handler.command = /^yts(earch)?$/i;

export default handler;
