const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
    console.log("Client terhubung:", socket.id);

    socket.on("chat message", (data) => {
        io.emit("chat message", {
            id: socket.id,
            nama: data.nama,
            pesan: data.pesan,
            waktu: new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit"
            })
        });

        console.log(`${data.nama}: ${data.pesan}`);
    });

    socket.on("disconnect", () => {
        console.log("Client terputus:", socket.id);
    });
});

server.listen(3000, "0.0.0.0", () => {
    console.log("Talkie berjalan di port 3000");
});