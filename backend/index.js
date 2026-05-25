const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.to(roomId).emit("receive-code", code);
  });

  socket.on("send-message", ({ roomId, message }) => {
    socket.to(roomId).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


app.post("/run", (req, res) => {
  const { code, input, language } = req.body;
  let filename = "main.cpp";
    if (language === "python") {
        filename = "main.py";
    }

  fs.writeFileSync(filename, code);

if (language === "python") {
  exec(`python ${filename}`, { timeout: 2000 }, (runError, runStdout, runStderr) => {
    if (runError) {
      return res.json({
        output: runStderr || runError.message,
      });
    }

    res.json({
      output: runStdout || "No output",
    });
  });

} else {
  exec(`g++ ${filename} -o temp.exe`, (compileError, stdout, stderr) => {
    if (compileError) {
      return res.json({
        output: stderr || compileError.message,
      });
    }

    const runProcess = exec("temp.exe", { timeout: 2000 }, (runError, runStdout, runStderr) => {
      if (runError) {
        return res.json({
          output: runStderr || runError.message,
        });
      }

      res.json({
        output: runStdout || "No output",
      });
    });

    if (input) {
      runProcess.stdin.write(input);
    }

    runProcess.stdin.end();
  });
}
});

server.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});