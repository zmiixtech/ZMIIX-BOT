module.exports = (sock) => {
  sock.commandHandlers = sock.commandHandlers || {}
  sock.commandHandlers["weather"] = async (conn, msg, args) => {
    await conn.sendMessage(msg.key.remoteJid, { text: "✅ weather plugin is active!" }, { quoted: msg });
  }
};
