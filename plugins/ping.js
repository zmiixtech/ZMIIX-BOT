module.exports = async (sock, msg) => {
  const start = Date.now();
  const sentMsg = await sock.sendMessage(msg.key.remoteJid, { text: '🏓 جاري قياس Ping...' });
  const ping = Date.now() - start;
  await sock.sendMessage(msg.key.remoteJid, { text: `📶 Ping: ${ping}ms` }, { quoted: sentMsg });
};
