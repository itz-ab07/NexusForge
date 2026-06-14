const { io } = require("socket.io-client");
const axios = require("axios");

const BACKEND_URL = "http://localhost:5000";
const TEST_ROOM = "collab-test-room";

async function testCollaboration() {
  console.log("Starting Collaboration Stack Integration Verification...\n");

  let checks = {
    joinedUsers: false,
    codeSync: false,
    cursorSync: false,
    chatSync: false,
    cppRun: false,
    pythonRun: false,
  };

  // 1. Initialize Clients
  const clientA = io(BACKEND_URL);
  const clientB = io(BACKEND_URL);

  const waitForEvent = (client, eventName, timeoutMs = 4000) => {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Timeout waiting for event: ${eventName}`));
      }, timeoutMs);
      client.once(eventName, (data) => {
        clearTimeout(timer);
        resolve(data);
      });
    });
  };

  try {
    // 2. Connect & Join Room (1. Two users joining same room)
    console.log("Testing: 1. Two users joining the same room...");
    
    // Connect clientA
    await new Promise((resolve) => clientA.on("connect", resolve));
    console.log("Client A connected:", clientA.id);

    // Connect clientB
    await new Promise((resolve) => clientB.on("connect", resolve));
    console.log("Client B connected:", clientB.id);

    // Client B listens for room-users updates
    const usersPromise = waitForEvent(clientB, "room-users");

    clientA.emit("join-room", {
      roomId: TEST_ROOM,
      user: { id: "user-a", firstName: "Aria" }
    });

    clientB.emit("join-room", {
      roomId: TEST_ROOM,
      user: { id: "user-b", firstName: "Kenji" }
    });

    const roomUsers = await usersPromise;
    console.log("Room Users List received by Client B:", roomUsers.map(u => u.username));
    
    if (roomUsers.length === 2 && roomUsers.some(u => u.username === "Aria") && roomUsers.some(u => u.username === "Kenji")) {
      checks.joinedUsers = true;
      console.log("✅ Check 1 passed: Two users successfully registered in room.");
    }

    // 3. Realtime Code Sync (2. Realtime code synchronization)
    console.log("\nTesting: 2. Realtime code synchronization...");
    const codeSyncPromise = waitForEvent(clientB, "receive-code");
    
    clientA.emit("code-change", {
      roomId: TEST_ROOM,
      code: "#include <iostream>\nint main() { std::cout << \"Hello test\"; }",
      language: "cpp"
    });

    const codeUpdate = await codeSyncPromise;
    console.log("Received code update on Client B:", JSON.stringify(codeUpdate));
    if (codeUpdate.code.includes("Hello test")) {
      checks.codeSync = true;
      console.log("✅ Check 2 passed: Code changes synchronized correctly.");
    }

    // 4. Cursor Sync (3. Cursor synchronization)
    console.log("\nTesting: 3. Cursor synchronization...");
    const cursorSyncPromise = waitForEvent(clientB, "cursor-update");

    clientA.emit("cursor-move", {
      roomId: TEST_ROOM,
      cursor: { line: 12, column: 8 }
    });

    const cursorUpdate = await cursorSyncPromise;
    console.log("Received cursor update on Client B:", cursorUpdate);
    if (cursorUpdate.cursor.line === 12 && cursorUpdate.cursor.column === 8) {
      checks.cursorSync = true;
      console.log("✅ Check 3 passed: Cursor positions synchronized correctly.");
    }

    // 5. Team Chat Sync (4. Team chat synchronization)
    console.log("\nTesting: 4. Team chat synchronization...");
    const chatSyncPromise = waitForEvent(clientB, "receive-message");

    clientA.emit("send-message", {
      roomId: TEST_ROOM,
      message: "Need priority queue advice!"
    });

    const chatUpdate = await chatSyncPromise;
    console.log("Received chat message on Client B:", chatUpdate);
    if (chatUpdate.txt.includes("priority queue")) {
      checks.chatSync = true;
      console.log("✅ Check 4 passed: Team chat messages synchronized correctly.");
    }

    // 6. C++ Code Execution (7. C++ execution)
    console.log("\nTesting: 7. C++ code execution...");
    const cppCode = `
#include <iostream>
using namespace std;
int main() {
    int x;
    cin >> x;
    cout << "Value: " << x * 2 << endl;
    return 0;
}
    `;
    const cppRes = await axios.post(`${BACKEND_URL}/run`, {
      code: cppCode,
      input: "42",
      language: "cpp"
    });
    console.log("C++ Execution Output:", JSON.stringify(cppRes.data));
    if (cppRes.data.output && cppRes.data.output.includes("Value: 84")) {
      checks.cppRun = true;
      console.log("✅ Check 7 passed: C++ compilation and execution with stdin worked.");
    }

    // 7. Python Code Execution (8. Python execution)
    console.log("\nTesting: 8. Python code execution...");
    const pythonCode = `
import sys
val = int(sys.stdin.read().strip())
print(f"Value: {val * 3}")
    `;
    const pythonRes = await axios.post(`${BACKEND_URL}/run`, {
      code: pythonCode,
      input: "10",
      language: "python"
    });
    console.log("Python Execution Output:", JSON.stringify(pythonRes.data));
    if (pythonRes.data.output && pythonRes.data.output.includes("Value: 30")) {
      checks.pythonRun = true;
      console.log("✅ Check 8 passed: Python execution with stdin worked.");
    }

  } catch (error) {
    console.error("❌ Test verification failed with error:", error.message);
  } finally {
    clientA.disconnect();
    clientB.disconnect();

    console.log("\n--- Verification Summary ---");
    console.log(`Two users join room: ${checks.joinedUsers ? "PASS ✅" : "FAIL ❌"}`);
    console.log(`Realtime code sync:  ${checks.codeSync ? "PASS ✅" : "FAIL ❌"}`);
    console.log(`Cursor sync:        ${checks.cursorSync ? "PASS ✅" : "FAIL ❌"}`);
    console.log(`Team chat sync:     ${checks.chatSync ? "PASS ✅" : "FAIL ❌"}`);
    console.log(`C++ execution:      ${checks.cppRun ? "PASS ✅" : "FAIL ❌"}`);
    console.log(`Python execution:   ${checks.pythonRun ? "PASS ✅" : "FAIL ❌"}`);
    
    const allChecksPassed = Object.values(checks).every(v => v === true);
    process.exit(allChecksPassed ? 0 : 1);
  }
}

testCollaboration();
