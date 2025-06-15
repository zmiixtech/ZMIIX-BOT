const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");
const P = require("pino");
const config = require("./config");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.sessionName);
  const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
  });

  // Load plugins
  const pluginFolder = path.join(__dirname, "plugins");
  fs.readdirSync(pluginFolder).forEach((file) => {
    if (file.endsWith(".js")) {
      const plugin = require(path.join(pluginFolder, file));
      if (typeof plugin === "function") {
        plugin(sock);
      }
    }
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    let text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
    const prefix = config.prefix.find((p) => text?.startsWith(p));
    if (!prefix) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    sock.commandHandlers = sock.commandHandlers || {};
    if (sock.commandHandlers[command]) {
      sock.commandHandlers[command](sock, msg, args);
    }
  });
}

startBot();
