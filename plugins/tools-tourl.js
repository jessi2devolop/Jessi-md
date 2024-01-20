import axios from 'axios';
import clph from 'caliph-api';
import fetch from 'node-fetch';

import uploadImage from '../lib/uploadImage.js';


async function shortUrl(url) {
  let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
  return await res.text();
}


let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';
  if (!mime) throw `reply picture|video|audio|sticker|document with command .tourl`;
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  let media = await q.download();
  if (isTele && media.length < 5242880) {
    try {
      let data = await uploadImage(media);
      m.reply(data);
    } catch (error) {
      console.error('Error uploading image to telegra.ph:', error);
      throw 'Failed to upload image to telegra.ph';
    }
  } else if (/image|video|audio|sticker|document/.test(mime)) {
    try {
      let data = await clph.tools.uploadFile(media);
      let shorten = await shortUrl(data.result.url);
      m.reply(shorten);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw 'Failed to upload file';
    }
  } else {
    throw 'No media found';
  }
};

handler.help = ['tourl'];
handler.tags = ['tools'];
handler.command = /^(upload|tourl)$/i;

export default handler;
