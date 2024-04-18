/*
import fg from 'api-dylux' 
import { tiktokdl } from '@bochilteam/scraper'

let handler = async (m, { conn, text, args, usedPrefix, command}) => {
if (!args[0]) throw `Enter the link of the video Tiktok`
if (!args[0].match(/tiktok/gi)) throw `Verify that the link is from tiktok`
let old = new Date()
let txt = `∘  *Fetching* : ${((new Date - old) * 1)} ms`
conn.reply(m.chat, global.wait, m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, description: null, 
title: '📤| downloads By Jessi-md 🌸',
body: me,
previewType: 0, thumbnail: thumb2, jpegThumbnail: thumb,
sourceUrl: 'https://github.com/whiteshadowofficial' }}})
try {
let p = await fg.tiktok(args[0]) 
conn.sendFile(m.chat, p.play, 'tiktok.mp4', p.nickname, m)
} catch {  	
try { 
const { author: { nickname }, video, description } = await tiktokdl(args[0])
const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd
if (!url) throw global.eror
conn.sendFile(m.chat, url, 'fb.mp4', ``, m)
} catch {
m.reply('*☓ An unexpected error occurred*')
}}}
*/

import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `Please send the TikTok video link.\n\nExample: ${usedPrefix}${command} tiktok url`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:vm\.tiktok\.com|tiktok\.com)\/([a-zA-Z0-9_-]+)\/?$/i;
  if (!urlRegex.test(args[0])) {
    throw 'Please provide a valid TikTok video URL.';
  }

  await m.react('⏳') 
  try {
    const response = await fetch(`https://aemt.me/download/tikdl?url=${encodeURIComponent(args[0])}`);
    const data = await response.json();

    if (data.status && data.result && data.result.url && data.result.url.wm) {
      const downloadLink = data.result.url.nowm;
      const nickname = data.result.author_info?.nickname || 'Unknown';
      const title = data.result.info_video?.title || 'Untitled TikTok Video';

      const caption = `${nickname}\n${title}`;

      await conn.sendFile(m.chat, downloadLink, 'tiktok_video.mp4', caption, m);
      await m.react('✅')
    } else {
      throw new Error('Error in url response.');
      await m.react('❎') 
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Failed to fetch video data. Please try again later.', m);
    await m.react('❎') 
  }
};

handler.help = ['tiktok'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler
