// copyright jessi2devolop 2021
// full owned mr chabby and mr white shadow don't yse this pluging without our permission

import speedTest from 'speedtest-net';
import fs from 'fs';

let handler = async (m, { conn, usedPrefix }) => {
    await m.reply('_Running speed test..._');

    const test = speedTest({ maxTime: 5000 });

    test.on('data', data => {
        const downloadSpeed = (data.speeds.download / 1024 / 1024).toFixed(2);
        const uploadSpeed = (data.speeds.upload / 1024 / 1024).toFixed(2);

        const resultMessage = `*Speed Test Results:*\n\nDownload Speed: ${downloadSpeed} Mbps\nUpload Speed: ${uploadSpeed} Mbps`;

        
        conn.sendMessage(m.chat, resultMessage, m);

        
        const filePath = `./speedtest_${m.chat}_${new Date().getTime()}.png`;
        const chart = data.visualize();
        chart.pipe(fs.createWriteStream(filePath));

        
        conn.sendMessage(m.chat, { image: fs.readFileSync(filePath), caption: '_Speed Test Results Visualization_' }, m);

        
        fs.unlinkSync(filePath);
    });

    test.on('error', error => {
        console.error(error);
        m.reply('_Error running speed test._');
    });
};

handler.help = ['speedtest'];
handler.tags = ['misc'];
handler.command = /^(speedtest)$/i;

export default handler;
