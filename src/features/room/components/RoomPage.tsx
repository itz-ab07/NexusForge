import { CodeEditorPanel } from "./CodeEditorPanel";
import { CopilotPanel } from "./CopilotPanel";
import { ProblemPanel } from "./ProblemPanel";
import { RoomHeader } from "./RoomHeader";
import { SquadPanel } from "./SquadPanel";
import { TeamChatPanel } from "./TeamChatPanel";
import { io } from "socket.io-client";
import { useState, useRef, useEffect } from "react";
const [message, setMessage] = useState("");
const [messages, setMessages] = useState<string[]>([]);


export function RoomPage() {
  const [output, setOutput] = useState("Click Run to execute code...");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("// start coding here");
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const isRemoteChange = useRef(false);

  const handleCodeChange = (newCode: string) => {
  setCode(newCode);

  if (isRemoteChange.current) {
    isRemoteChange.current = false;
    return;
  }

  if (joined && roomId) {
    socketRef.current.emit("code-change", {
      roomId,
      code: newCode,
    });
  }
};

  const socketRef = useRef<any>(null);

useEffect(() => {
  socketRef.current = io("http://localhost:5000");

  socketRef.current.on("receive-code", (newCode: string) => {
    isRemoteChange.current = true;
    setCode(newCode);
  });

  return () => {
    socketRef.current?.disconnect();
  };
}, []);

const joinRoom = () => {
  if (!roomId) return;

  socketRef.current.emit("join-room", roomId);
  setJoined(true);
};

const sendMessage = () => {
  if (!roomId || !message) return;

  socketRef.current.emit("send-message", {
    roomId,
    message,
  });

  setMessages((prev) => [...prev, "You: " + message]);
  setMessage("");
};

useEffect(() => {
  socketRef.current.on("receive-message", (msg: string) => {
    setMessages((prev) => [...prev, "Other: " + msg]);
  });

  return () => {
    socketRef.current.off("receive-message");
  };
}, []);

  return (
    <div className="flex flex-col min-h-screen">
      <RoomHeader
        code={code}
        input={input}
        setOutput={setOutput}
        setLoading={setLoading}
      />
      <div className="flex-1 grid grid-cols-12 gap-3 p-3 min-h-0">
        <SquadPanel />
        <main className="col-span-12 md:col-span-7 flex flex-col gap-3 min-w-0">
          <ProblemPanel />
          <div className="holo-card p-3">
          <div className="text-sm text-neon-cyan mb-2">Custom Input</div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input here..."
              className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-3 text-sm font-mono text-white outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div className="flex gap-2 mb-2">
  <input
    placeholder="Room ID"
    value={roomId}
    onChange={(e) => setRoomId(e.target.value)}
    className="border px-2 py-1"
  />

  <button onClick={joinRoom} className="bg-green-500 px-3 py-1">
    Join
  </button>
</div>

          <CodeEditorPanel code={code} setCode={handleCodeChange} />
          <div className="holo-card p-3 text-xs font-mono text-white bg-black/40 border border-white/10">
            <div className="text-neon-cyan mb-2">Output</div>

            {loading ? (
              <div className="text-yellow-400">Running code...</div>
            ) : (
              <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
            )}
          </div>
        </main>
        <aside className="col-span-12 md:col-span-3 flex flex-col gap-3 min-h-0">
          <div className="holo-card p-3 mt-2">
  <div className="text-neon-cyan mb-2">Team Chat</div>

  <div className="h-40 overflow-auto text-sm mb-2">
    {messages.map((m, i) => (
      <div key={i}>{m}</div>
    ))}
  </div>

  <div className="flex gap-2">
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type message..."
      className="flex-1 px-2 py-1 border"
    />

    <button onClick={sendMessage} className="bg-blue-500 px-3">
      Send
    </button>
  </div>
</div>
          <CopilotPanel />
          <TeamChatPanel />
        </aside>
      </div>
    </div>
  );
}
