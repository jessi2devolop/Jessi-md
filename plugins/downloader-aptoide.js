import { search, download } from 'aptoide-scraper';
import axios from 'axios';
import fs from 'fs';

const getRandom = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Example: ${usedPrefix + command} <app name>`;
    const appName = args.join(' ');

    try {
        const results = await search(appName);
        if (results.length === 0) {
            return conn.reply(m.chat, `No results found for ${appName}`, m);
        }

        const appDetails = await download(results[0].id);
        const url = appDetails.dllink;

        const randomName = getRandom(".apk");
        const filePath = `./${appDetails.package}_${randomName}`;
        
        const response = await axios.get(url, { responseType: 'stream' });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        conn.sendFile(m.chat, filePath, `${appDetails.package}.apk`, `Apk Name: ${appDetails.name}\nSize: ${appDetails.size}`, m);

        fs.unlinkSync(filePath); 
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Failed to download APK. Please try again later.', m);
    }
};

handler.help = ['apk <app name>'];
handler.tags = ['downloader'];
handler.command = /^(apk)$/i;

export default handler;
