module.exports = (sock) => {
  sock.commandHandlers = sock.commandHandlers || {};
  sock.commandHandlers["ping"] = async (conn, msg, args) => {
    await conn.sendMessage(msg.key.remoteJid, { text: "🏓 Pong!" }, { quoted: msg });
  };
};
