module.exports = (sock) => {
  sock.commandHandlers = sock.commandHandlers || {}
  sock.commandHandlers["sticker"] = async (conn, msg, args) => {
    await conn.sendMessage(msg.key.remoteJid, { text: "✅ sticker plugin is active!" }, { quoted: msg });
  }
};
