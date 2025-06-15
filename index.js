const makeWASocket = require("@whiskeysockets/baileys").default;
const { useSingleFileAuthState } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const { delay } = require("@whiskeysockets/baileys");
const qrcode = require("qrcode-terminal"); // باش نطبع QR في التيرمنال

const { state, saveState } = useSingleFileAuthState('./auth_info.json');

async function startSock() {
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false // نلغيوها
    });

    sock.ev.on("creds.update", saveState);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            qrcode.generate(qr, { small: true }); // هادي باش تطبع QR ف التيرمينال
        }

        if (connection === "close") {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                startSock();
            }
        } else if (connection === "open") {
            console.log("✅ BOT Connected!");
        }
    });
}

startSock();
