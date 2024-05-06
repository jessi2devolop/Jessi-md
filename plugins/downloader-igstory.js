// downloader ig story by jessi2decolop team
// api.lolhuman.xyz
/*
import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, args }) => {
    let username;
  
    if (args[0] && args[0].startsWith('https://www.instagram.com/stories/')) {
        username = args[0].match(/\/stories\/([^/]+)\//)[1];
    } else {
        username = args[0];
    }

    try {

        await m.react('🕥');
        const apiUrl = `https://api.lolhuman.xyz/api/igstory/${username}/?apikey=${apilol}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch Instagram story. Status code: ${response.status}`);
        }

        const data = await response.json();

        if (data.status && data.result) {
            const mediaUrls = data.result;

            for (const mediaUrl of mediaUrls) {
                
                const fileName = `story_media.${mediaUrl.split('.').pop()}`;
                const mediaResponse = await fetch(mediaUrl);
                const buffer = await mediaResponse.arrayBuffer();

                m.react('✅');
                await conn.sendFile(m.chat, Buffer.from(buffer), fileName, `Instagram story of ${username} 🫢`, m);
            }
        } else {
            throw new Error('Error in response data');
        }
    } catch (error) {
        console.error('Error:', error.message);
        m.react('🤔');
        m.reply(`◔ Failed to download Instagram story.\n◔ Please make sure the username or link is correct and try again later.\n\nExample:\n> ${usedPrefix}${command} UserName Or Story Link`);
    }
};
*/

import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `Please send the Instagram story link.\n\nExample: ${usedPrefix}${command} insta_story_url`;
  }

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com)\/stories\/([a-zA-Z0-9_\-]+)\/([0-9]+)\/?/i;
  if (!urlRegex.test(args[0])) {
    throw 'Please provide a valid Instagram story URL.';
  }

  await m.react('⏳');
  try {
    const response = await fetch(`https://aemt.me/download/igdl?url=${encodeURIComponent(args[0])}`);
    const data = await response.json();

    if (data.status && data.result && Array.isArray(data.result) && data.result.length > 0) {
      const { wm, thumbnail, url } = data.result[0];
      const caption = `Watermark: ${wm}`;

      await conn.sendFile(m.chat, url, 'insta_story.mp4', caption, m, { thumbnail });
      await m.react('✅');
    } else {
      throw new Error('Error in URL response.');
      await m.react('❎');
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'Failed to fetch Insta Story data. Please try again later.', m);
    await m.react('❎');
  }
};

handler.help = ['story'].map(v => v + ' <story_url or username>');
handler.tags = ['downloader'];
handler.command = /^story$/i;

export default handler;
