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

const NEON_COLORS = [
  "oklch(0.85 0.18 200)", // cyan
  "oklch(0.7 0.22 285)", // purple
  "oklch(0.72 0.27 340)", // pink
  "oklch(0.72 0.2 240)", // blue
  "oklch(0.78 0.2 90)",   // gold
];

const rooms = {}; // roomId -> { code, language, users: { socketId -> { userId, username, color, cursor, mic, video } } }

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  let currentRoomId = null;

  socket.on("join-room", ({ roomId, user }) => {
    if (!roomId) return;
    
    currentRoomId = roomId;
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        code: "// start coding here\n",
        language: "cpp",
        users: {},
      };
    }

    // Determine user info
    const userId = user?.id || "guest-" + socket.id;
    const username = user?.firstName || "Guest-" + socket.id.substring(0, 4);
    
    // Check if user is already registered in the room under this socket
    const existingUsersCount = Object.keys(rooms[roomId].users).length;
    const color = NEON_COLORS[existingUsersCount % NEON_COLORS.length];

    rooms[roomId].users[socket.id] = {
      socketId: socket.id,
      userId,
      username,
      color,
      cursor: { line: 1, column: 1 },
      mic: false,
      video: false,
      status: "online",
      role: existingUsersCount === 0 ? "Captain" : "Coder",
    };

    console.log(`User ${username} (${socket.id}) joined room: ${roomId}`);

    // Send initial room state to the newly joined user
    socket.emit("room-init", {
      code: rooms[roomId].code,
      language: rooms[roomId].language,
      users: Object.values(rooms[roomId].users),
      yourInfo: rooms[roomId].users[socket.id],
    });

    // Broadcast updated users list to everyone in the room
    io.to(roomId).emit("room-users", Object.values(rooms[roomId].users));

    // Send system join notification
    socket.to(roomId).emit("receive-message", {
      who: "System",
      txt: `${username} joined the arena!`,
      c: "oklch(0.78 0.2 90)", // gold system message
    });
  });



  socket.on("code-change", ({ roomId, code, language }) => {
    if (!roomId || !rooms[roomId]) return;
    rooms[roomId].code = code;
    if (language) rooms[roomId].language = language;
    socket.to(roomId).emit("receive-code", { code, language });
  });

  socket.on("cursor-move", ({ roomId, cursor }) => {
    if (!roomId || !rooms[roomId] || !rooms[roomId].users[socket.id]) return;
    rooms[roomId].users[socket.id].cursor = cursor;
    socket.to(roomId).emit("cursor-update", {
      socketId: socket.id,
      cursor,
      username: rooms[roomId].users[socket.id].username,
      color: rooms[roomId].users[socket.id].color,
    });
  });

  socket.on("send-message", ({ roomId, message }) => {
    if (!roomId || !rooms[roomId] || !rooms[roomId].users[socket.id]) return;
    const sender = rooms[roomId].users[socket.id];
    socket.to(roomId).emit("receive-message", {
      who: sender.username,
      txt: message,
      c: sender.color,
    });
  });

  socket.on("mic-toggle", ({ roomId, mic }) => {
    if (!roomId || !rooms[roomId] || !rooms[roomId].users[socket.id]) return;
    rooms[roomId].users[socket.id].mic = mic;
    io.to(roomId).emit("room-users", Object.values(rooms[roomId].users));
  });

  socket.on("video-toggle", ({ roomId, video }) => {
    if (!roomId || !rooms[roomId] || !rooms[roomId].users[socket.id]) return;
    rooms[roomId].users[socket.id].video = video;
    io.to(roomId).emit("room-users", Object.values(rooms[roomId].users));
  });

  // WebRTC mesh signaling
  socket.on("webrtc-signal", ({ roomId, targetId, signal }) => {
    io.to(targetId).emit("webrtc-signal", {
      senderId: socket.id,
      signal,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (currentRoomId && rooms[currentRoomId]) {
      const user = rooms[currentRoomId].users[socket.id];
      if (user) {
        const username = user.username;
        delete rooms[currentRoomId].users[socket.id];

        // Notify room members
        io.to(currentRoomId).emit("room-users", Object.values(rooms[currentRoomId].users));
        io.to(currentRoomId).emit("receive-message", {
          who: "System",
          txt: `${username} left the arena.`,
          c: "oklch(0.7 0.2 25)", // red system message
        });

        // Clean up empty rooms
        if (Object.keys(rooms[currentRoomId].users).length === 0) {
          delete rooms[currentRoomId];
        }
      }
    }
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
  const runProcess = exec(`python ${filename}`, { timeout: 2000 }, (runError, runStdout, runStderr) => {
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