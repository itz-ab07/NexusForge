const { io } = require("socket.io-client");

const BACKEND_URL = "http://localhost:5000";
const TEST_ROOM = "reconnect-test-room";

async function testReconnectRejoin() {
  console.log("Testing: Socket reconnect + room rejoin flow...\n");

  const clientB = io(BACKEND_URL);
  await new Promise((resolve) => clientB.on("connect", resolve));

  clientB.emit("join-room", {
    roomId: TEST_ROOM,
    user: { id: "user-b", firstName: "Observer" },
  });

  await new Promise((resolve) => setTimeout(resolve, 300));

  let clientA = io(BACKEND_URL);
  await new Promise((resolve) => clientA.on("connect", resolve));
  const firstId = clientA.id;
  console.log("Client A connected (first):", firstId);

  clientA.emit("join-room", {
    roomId: TEST_ROOM,
    user: { id: "user-a", firstName: "Editor" },
  });

  const usersAfterFirstJoin = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout waiting for room-users")), 4000);
    clientB.once("room-users", (users) => {
      clearTimeout(timer);
      resolve(users);
    });
  });
  console.log("Users after first join:", usersAfterFirstJoin.map((u) => u.username));

  clientA.disconnect();
  console.log("Client A disconnected");

  await new Promise((resolve) => setTimeout(resolve, 500));

  clientA = io(BACKEND_URL);
  await new Promise((resolve) => clientA.on("connect", resolve));
  const secondId = clientA.id;
  console.log("Client A reconnected (second):", secondId);

  if (firstId === secondId) {
    throw new Error("Expected a new socket id after reconnect");
  }

  const rejoinUsersPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout waiting for rejoin room-users")), 4000);
    clientB.once("room-users", (users) => {
      clearTimeout(timer);
      resolve(users);
    });
  });

  // Mirrors RoomPage rejoinIfNeeded on connect
  clientA.emit("join-room", {
    roomId: TEST_ROOM,
    user: { id: "user-a", firstName: "Editor" },
  });

  const usersAfterRejoin = await rejoinUsersPromise;
  console.log("Users after rejoin:", usersAfterRejoin.map((u) => u.username));

  const codeSyncPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Timeout waiting for receive-code")), 4000);
    clientB.once("receive-code", (data) => {
      clearTimeout(timer);
      resolve(data);
    });
  });

  clientA.emit("code-change", {
    roomId: TEST_ROOM,
    code: "print('reconnected')",
    language: "python",
  });

  const codeUpdate = await codeSyncPromise;
  console.log("Code sync after rejoin:", codeUpdate.code);

  clientA.disconnect();
  clientB.disconnect();

  const passed =
    usersAfterFirstJoin.length === 2 &&
    usersAfterRejoin.length === 2 &&
    usersAfterRejoin.some((u) => u.username === "Editor") &&
    codeUpdate.code.includes("reconnected");

  console.log(passed ? "\n✅ Reconnect rejoin test PASSED" : "\n❌ Reconnect rejoin test FAILED");
  process.exit(passed ? 0 : 1);
}

testReconnectRejoin().catch((err) => {
  console.error("❌ Reconnect test failed:", err.message);
  process.exit(1);
});
