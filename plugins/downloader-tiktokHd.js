// downloader-tiktokHd.js

import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Enter the link of the TikTok video.`;

    try {
        let tiktokUrl = args[0].trim();

        
        if (!/(vm\.tiktok\.com|tiktok\.com)/i.test(tiktokUrl)) {
            throw 'Please enter a valid TikTok link.';
        }

        let apiUrl = `https://vihangayt.me/download/tiktok?url=${encodeURIComponent(tiktokUrl)}`;

        let response = await fetch(apiUrl);
        if (response.ok) {
            let data = await response.json();

            if (data.status === true && data.data && data.data.play_url) {
                let videoBuffer = await fetch(data.data.play_url).then(res => res.buffer());

                
                let caption = `*Author:* [${data.data.author_name}](${data.data.author})\n*Description:* ${data.data.desc}`;

                
                conn.sendFile(m.chat, videoBuffer, 'video.mp4', caption, m);
            } else {
                conn.reply(m.chat, 'Failed to download TikTok video. Please try again later.', m);
            }
        } else {
            conn.reply(m.chat, 'Error connecting to the TikTok downloader server. Please try again later.', m);
        }
    } catch (error) {
        console.error('TikTok downloader error:', error);
        conn.reply(m.chat, 'An error occurred while processing the TikTok download request. ' + error, m);
    }
};

handler.help = ['tiktokhd'];
handler.tags = ['downloader'];
handler.command = /^(tiktokhd)$/i;

export default handler;
