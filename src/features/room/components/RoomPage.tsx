import { CodeEditorPanel } from "./CodeEditorPanel";
import { CopilotPanel } from "./CopilotPanel";
import { ProblemPanel } from "./ProblemPanel";
import { RoomHeader } from "./RoomHeader";
import { SquadPanel } from "./SquadPanel";
import { TeamChatPanel } from "./TeamChatPanel";
import { io } from "socket.io-client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthProvider";

export function RoomPage() {
  const { user } = useAuth();
  const [output, setOutput] = useState("Click Run to execute code...");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("// start coding here\n");
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [myInfo, setMyInfo] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [remoteCursors, setRemoteCursors] = useState<any[]>([]);
  
  const isRemoteChange = useRef(false);
  const socketRef = useRef<any>(null);

  // Initialize socket connection
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    // Handle code synchronization from remote users
    socketRef.current.on("receive-code", ({ code: newCode, language: newLang }: { code: string; language?: string }) => {
      isRemoteChange.current = true;
      setCode(newCode);
      if (newLang) {
        setLanguage(newLang);
      }
    });

    // Handle initial room state synchronization
    socketRef.current.on("room-init", ({ code: initCode, language: initLang, users, yourInfo }: any) => {
      isRemoteChange.current = true;
      setCode(initCode);
      setLanguage(initLang);
      setOnlineUsers(users);
      setMyInfo(yourInfo);
    });

    // Handle user list updates
    socketRef.current.on("room-users", (users: any[]) => {
      setOnlineUsers(users);
      // Clean up remoteCursors of offline users
      setRemoteCursors((prev) => prev.filter((rc) => users.some((u) => u.socketId === rc.socketId)));
      
      const me = users.find((u) => u.socketId === socketRef.current?.id);
      if (me) {
        setMyInfo(me);
      }
    });

    // Handle cursor synchronization updates
    socketRef.current.on("cursor-update", ({ socketId, cursor, username, color }: any) => {
      setRemoteCursors((prev) => {
        const filtered = prev.filter((c) => c.socketId !== socketId);
        return [...filtered, { socketId, cursor, username, color }];
      });
    });

    // Handle team chat updates
    socketRef.current.on("receive-message", (msg: { who: string; txt: string; c: string }) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Parse URL parameter "?id=roomId" on mount to auto-join
    const params = new URLSearchParams(window.location.search);
    const urlRoomId = params.get("id");
    if (urlRoomId) {
      setRoomId(urlRoomId);
      // Wait for socket to establish connection before joining
      const joinOnConnect = () => {
        socketRef.current.emit("join-room", { roomId: urlRoomId, user });
        setJoined(true);
        socketRef.current.off("connect", joinOnConnect);
      };
      if (socketRef.current.connected) {
        joinOnConnect();
      } else {
        socketRef.current.on("connect", joinOnConnect);
      }
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user]);

  // Code editor updates
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
        language,
      });
    }
  };

  // Live cursor updates
  const handleCursorMove = (cursorPos: { line: number; column: number }) => {
    if (joined && roomId) {
      socketRef.current.emit("cursor-move", { roomId, cursor: cursorPos });
    }
  };

  // Language switcher updates
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    if (joined && roomId) {
      socketRef.current.emit("code-change", {
        roomId,
        code,
        language: newLang,
      });
    }
  };

  // Join room manually
  const joinRoom = () => {
    if (!roomId) return;
    socketRef.current.emit("join-room", { roomId, user });
    setJoined(true);

    // Update URL query parameter without reloading the page
    const newUrl = `${window.location.pathname}?id=${encodeURIComponent(roomId)}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  // Send message
  const handleSendMessage = (msgText: string) => {
    if (!roomId || !msgText.trim()) return;

    socketRef.current.emit("send-message", {
      roomId,
      message: msgText,
    });

    setMessages((prev) => [
      ...prev,
      {
        who: "You",
        txt: msgText,
        c: myInfo?.color || "oklch(0.78 0.2 90)",
      },
    ]);
  };

  // Handle local microphone toggle
  const handleMicToggle = (micState: boolean) => {
    if (joined && roomId) {
      socketRef.current.emit("mic-toggle", { roomId, mic: micState });
    }
  };

  // Handle local video toggle
  const handleVideoToggle = (videoState: boolean) => {
    if (joined && roomId) {
      socketRef.current.emit("video-toggle", { roomId, video: videoState });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <RoomHeader
        code={code}
        input={input}
        roomId={roomId}
        joined={joined}
        setOutput={setOutput}
        setLoading={setLoading}
      />
      <div className="flex-1 grid grid-cols-12 gap-3 p-3 min-h-0">
        <SquadPanel
          users={onlineUsers}
          myInfo={myInfo}
          onMicToggle={handleMicToggle}
          onVideoToggle={handleVideoToggle}
        />
        
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
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Language:</span>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white cursor-pointer outline-none"
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
              </select>
            </div>
            
            {!joined && (
              <div className="flex gap-2 items-center">
                <input
                  placeholder="Enter Room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                />
                <button
                  onClick={joinRoom}
                  className="bg-gradient-primary px-4 py-1.5 text-xs font-semibold text-white rounded-lg hover:opacity-90 transition glow-purple"
                >
                  Join Room
                </button>
              </div>
            )}
            
            {joined && (
              <div className="text-xs text-status-success flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-success-ping opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success-ping" />
                </span>
                Connected to room: <span className="font-mono text-neon-cyan font-semibold">{roomId}</span>
              </div>
            )}
          </div>

          <CodeEditorPanel
            code={code}
            setCode={handleCodeChange}
            language={language}
            onCursorMove={handleCursorMove}
            remoteCursors={remoteCursors}
            mySocketId={socketRef.current?.id}
          />
          
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
          <CopilotPanel />
          <TeamChatPanel messages={messages} onSendMessage={handleSendMessage} />
        </aside>
      </div>
    </div>
  );
}
