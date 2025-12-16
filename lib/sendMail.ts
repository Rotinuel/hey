import net from "net";

export function sendMail(to: string, subject: string, html: string) {
  return new Promise<void>((resolve, reject) => {
    const socket = net.createConnection(1025, "127.0.0.1");

    socket.on("connect", () => {
      socket.write("HELO localhost\r\n");
      socket.write("MAIL FROM:<test@localhost>\r\n");
      socket.write(`RCPT TO:<${to}>\r\n`);
      socket.write("DATA\r\n");
      socket.write(
        `Subject: ${subject}\r\n` +
        `MIME-Version: 1.0\r\n` +
        `Content-Type: text/html\r\n\r\n` +
        `${html}\r\n.\r\n`
      );
      socket.write("QUIT\r\n");
      socket.end();
      resolve();
    });

    socket.on("error", (err) => {
      reject(err);
    });
  });
}
