import cheerio from 'cheerio';
import fetch from 'node-fetch';
import { FormData } from 'formdata-node';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Ex: ${usedPrefix + command} https://play.google.com/store/apps/details?id=com.linecorp.LGGRTHN`;
    let res = await apkDl(args[0]);
    await m.reply('_In progress, please wait..._');
    conn.sendMessage(m.chat, { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName }, { quoted: m });
};

handler.help = ['apkdl'];
handler.tags = ['downloader'];
handler.command = /^(apkdl)$/i;

export default handler;

async function apkDl(url) {
    const form = new FormData();
    form.append('x', 'downapk');
    form.append('t', 1);
    form.append('google_id', url);
    form.append('device_id', '');
    form.append('language', 'en-US');
    form.append('dpi', 480);
    form.append('gl', 'SUQ=');
    form.append('model', '');
    form.append('hl', 'en');
    form.append('de_av', '');
    form.append('aav', '');
    form.append('android_ver', 5.1);
    form.append('tbi', 'arm64-v8a');
    form.append('country', 0);

    try {
        let res = await fetch('https://apk.support/gapi/index.php', {
            method: 'POST',
            body: form.toString(), // Convert FormData to string
            headers: {
                ...form.headers,
            },
        });

        let $ = cheerio.load(await res.text());
        let fileName = $('div.browser > div.dvContents > ul > li > a').text().trim();
        let download = $('div.browser > div.dvContents > ul > li > a').attr('href');
        
        if (!download) throw 'Can\'t find the APK download link!';
        
        let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');
        return { fileName, mimetype, download };
    } catch (error) {
        console.error('Error:', error.message);
        throw 'Failed to fetch APK information. Please try again later.';
    }
}
