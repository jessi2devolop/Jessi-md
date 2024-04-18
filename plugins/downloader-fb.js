/*
import fetch from 'node-fetch'
import fg from 'api-dylux'


const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `✳️ Please send the link of a Facebook video\n\n📌 EXAMPLE :\n*${usedPrefix + command}* https://www.facebook.com/Ankursajiyaan/videos/981948876160874/?mibextid=rS40aB7S9Ucbxw6v`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  if (!urlRegex.test(args[0])) {
    throw '⚠️ PLEASE GIVE A VALID URL.'
  }

 await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '⌛'  }}, { messageId: m.key.id })

  try {
    const result = await fg.fbdl(args[0]);
    const tex = `${result.title}`

    const response = await fetch(result.videoUrl)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)
    
    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
  } catch (error) {
    console.log(error)
    m.reply('⚠️ An error occurred while processing the request. Please try again later.')
  }
}

handler.help = ['facebook <url>']
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i

export default handler
*/


import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `Please send the link of a Facebook video.\n\nExample: ${usedPrefix} ${command} facebook url`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com\/share\/v\/|fb\.watch\?v=)([a-zA-Z0-9_-]+)\/?(\?mibextid=[a-zA-Z0-9]+)?$/i;
  if (!urlRegex.test(args[0])) {
    throw 'Please provide a valid Facebook video URL.';
  }

  await m.react('⏳') 
  try {
    const response = await fetch(`https://aemt.me/download/fbdown?url=${encodeURIComponent(args[0])}`);
    const data = await response.json();

    if (data.status && data.result && data.result.url && data.result.url.urls && data.result.url.urls.length > 0) {
      const { hd, sd } = data.result.url.urls[0];

      if (hd) {
        await conn.sendFile(m.chat, hd, 'facebook_hd.mp4', `Facebook HD Video`, m);
        await m.react('✅') 
      } else if (sd) {
        await conn.sendFile(m.chat, sd, 'facebook_sd.mp4', `Facebook SD Video`, m);
        await m.react('✅')
      } else {
        throw new Error('Video download link not response. Check your url. ');
        await m.react('❎') 
      }
    } else {
      throw new Error('Error in download video.');
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Failed to fetch video data. Please try again later.', m);
    await m.react('❎') 
  }
};

handler.help = ['facebook <url>'];
handler.tags = ['downloader'];
handler.command = /^(facebook|fb)(downloder|dl)?$/i;

export default handler;


