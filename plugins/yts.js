module.exports = (sock) => {
  sock.commandHandlers = sock.commandHandlers || {}
  sock.commandHandlers["yts"] = async (conn, msg, args) => {
    await conn.sendMessage(msg.key.remoteJid, { text: "✅ yts plugin is active!" }, { quoted: msg });
  }
};
