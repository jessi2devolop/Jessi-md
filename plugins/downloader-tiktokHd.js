// downloader-tiktokHd.js


import fetch from 'node-fetch';

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw `Enter the link of the TikTok video.`;

    try {
        let tiktokUrl = args[0].trim();

        if (!/(vm\.tiktok\.com|tiktok\.com)/i.test(tiktokUrl)) {
            throw 'Please enter a valid TikTok link.';
        }

        let apiUrl = `https://api-rest-jessi2devolop.koyeb.app/api/dowloader/tiktok?url=${encodeURIComponent(tiktokUrl)}`;

        let response = await fetch(apiUrl);
        if (response.ok) {
            let data = await response.json();

            if (data.status === true && data.result && data.result.video_HD && data.result.pp && data.result.author_name && data.result.description) {
                let videoBuffer = await fetch(data.result.video_HD).then(res => res.buffer());
                let ppr = await shortUrl(data.result.pp);
                let caption = `*Author:* [${data.result.author_name}]\n*Description:* ${data.result.description}\n*Profile Picture:* ${ppr}`;

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

handler.help = ['tiktokhd <url>'];
handler.tags = ['downloader'];
handler.command = /^(tiktokhd)$/i;

export default handler;

async function shortUrl(url) {
    try {
        let response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        if (response.ok) {
            let shortenedUrl = await response.text();
            return shortenedUrl;
        } else {
            throw 'Error shortening URL';
        }
    } catch (error) {
        console.error('URL shortening error:', error);
        throw 'An error occurred while shortening the URL';
    }
            } 
