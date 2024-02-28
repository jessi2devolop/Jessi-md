let handler = async (m, { conn, args }) => {
  const isGroup = m.isGroup;
  const chatJid = isGroup ? m.chat : m.sender;

  const jidMessage = `This ${isGroup ? 'group' : 'private chat'}'s JID: ${chatJid}`;

  conn.reply(m.chat, jidMessage, m);
}

handler.help = ['jid'];
handler.tags = ['owner'];
handler.command = /^(jid)$/i;

handler.rowner = true

export default handler
