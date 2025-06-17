module.exports = async (sock, msg) => {
  const ownerName = "ZMIIX";
  const ownerNumber = "+212776003604";
  await sock.sendMessage(msg.key.remoteJid, {
    text: `👤 المدير: *${ownerName}*\n📞 رقم الهاتف: ${ownerNumber}`
  }, { quoted: msg });
};
