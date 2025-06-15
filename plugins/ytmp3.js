module.exports = (sock) => {
  sock.commandHandlers = sock.commandHandlers || {}
  sock.commandHandlers["ytmp3"] = async (conn, msg, args) => {
    await conn.sendMessage(msg.key.remoteJid, { text: "✅ ytmp3 plugin is active!" }, { quoted: msg });
  }
};
