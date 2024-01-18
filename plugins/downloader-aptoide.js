import fetch from 'node-fetch';
import { search, download } from 'aptoide-scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Example: ${usedPrefix + command} com.example.app`;
    
    try {
        let results = await search(args[0]);
        
        if (results.length === 0) {
            return m.reply(`No results found for '${args[0]}'.`);
        }

        let appInfo = results[0];
        let appData = await download(appInfo.package);

        let inf = `*App Name:* ${appData.name}\n`;
        inf += `*App Package ID:* ${appData.package}\n`;
        inf += `*Last Update:* ${appData.lastup}\n`;
        inf += `*App Size:* ${appData.size}\n\n`;

        const filePath = `../${appData.name}.apk`;

        if (appData.size > 150) {
            return m.reply(`File size is larger than 150 MB. Unable to send.`);
        }

        let response = await fetch(appData.dllink);
        let buffer = await response.buffer();

        await conn.sendDocument(m.chat, buffer, m, { mimetype: 'application/vnd.android.package-archive', filename: `${appData.name}.apk`, caption: inf });
    } catch (error) {
        console.error(error);
        return m.reply('Internal error found. Please try again later.');
    }
};

handler.help = ['apkdl <package-id>'];
handler.tags = ['downloader'];
handler.command = /^(aptodl)$/i;

export default handler;
