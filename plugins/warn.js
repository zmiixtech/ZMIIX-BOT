module.exports = (sock) => {
  sock.commandHandlers = sock.commandHandlers || {}
  sock.commandHandlers["warn"] = async (conn, msg, args) => {
    await conn.sendMessage(msg.key.remoteJid, { text: "✅ warn plugin is active!" }, { quoted: msg });
  }
};
