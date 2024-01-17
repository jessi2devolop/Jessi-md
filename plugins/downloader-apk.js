import cheerio from 'cheerio';
import fetch from 'node-fetch';

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
	const formData = new FormData();
	formData.append('x', 'downapk');
	formData.append('t', 1);
	formData.append('google_id', url);
	formData.append('device_id', '');
	formData.append('language', 'en-US');
	formData.append('dpi', 480);
	formData.append('gl', 'SUQ=');
	formData.append('model', '');
	formData.append('hl', 'en');
	formData.append('de_av', '');
	formData.append('aav', '');
	formData.append('android_ver', 5.1);
	formData.append('tbi', 'arm64-v8a');
	formData.append('country', 0);

	let res = await fetch('https://apk.support/gapi/index.php', {
		method: 'post',
		body: formData,
	});

	let $ = cheerio.load(await res.text());
	let fileName = $('div.browser > div.dvContents > ul > li > a').text().trim().split(' ')[0];
	let download = $('div.browser > div.dvContents > ul > li > a').attr('href');
	if (!download) throw 'Can\'t download the apk!';
	let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');
	return { fileName, mimetype, download };
}

