import { FileCode } from "lucide-react";
import Editor from "@monaco-editor/react";
import { useRef, useEffect } from "react";

export function CodeEditorPanel({
  code,
  setCode,
  onCursorMove,
  remoteCursors = [],
  mySocketId,
}: {
  code: string;
  setCode: (value: string) => void;
  onCursorMove?: (cursor: { line: number; column: number }) => void;
  remoteCursors?: any[];
  mySocketId?: string;
}) {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  // Update decorations when remote cursors change
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current || !remoteCursors) return;

    const newDecorations: any[] = [];

    // Remove existing cursor style sheets
    const existingStyles = document.querySelectorAll("style[data-cursor-id]");
    existingStyles.forEach((el) => el.remove());

    remoteCursors.forEach((rc) => {
      // Don't render my own remote cursor or cursors with missing coordinates
      if (!rc.cursor || rc.socketId === mySocketId) return;

      const cursorClassName = `remote-cursor-${rc.socketId}`;
      const tagClassName = `remote-tag-${rc.socketId}`;

      // Create a style element for this cursor's unique user color
      const styleEl = document.createElement("style");
      styleEl.setAttribute("data-cursor-id", rc.socketId);
      styleEl.innerHTML = `
        .${cursorClassName} {
          background-color: ${rc.color} !important;
          width: 2px !important;
        }
        .${tagClassName} {
          background-color: ${rc.color} !important;
          color: #000000 !important;
          font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
          font-size: 9px !important;
          font-weight: bold !important;
          padding: 1px 4px !important;
          border-radius: 3px !important;
          position: absolute !important;
          top: -14px !important;
          left: 0px !important;
          white-space: nowrap !important;
          pointer-events: none !important;
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4) !important;
          z-index: 10 !important;
        }
        .${tagClassName}::after {
          content: "${rc.username}";
        }
      `;
      document.head.appendChild(styleEl);

      // Create the decoration range at the cursor coordinates
      newDecorations.push({
        range: new monacoRef.current.Range(
          rc.cursor.line,
          rc.cursor.column,
          rc.cursor.line,
          rc.cursor.column
        ),
        options: {
          className: cursorClassName,
          hoverMessage: { value: `User: ${rc.username}` },
          after: {
            content: " ", // placeholder for name tag position
            inlineClassName: tagClassName,
          },
        },
      });
    });

    // Apply delta decorations to Monaco instance
    decorationsRef.current = editorRef.current.deltaDecorations(
      decorationsRef.current,
      newDecorations
    );

    return () => {
      // Clean up injected style sheets on unmount
      const cleanupStyles = document.querySelectorAll("style[data-cursor-id]");
      cleanupStyles.forEach((el) => el.remove());
    };
  }, [remoteCursors, mySocketId]);

  // Clean up decorations on unmount
  useEffect(() => {
    return () => {
      if (editorRef.current && decorationsRef.current.length > 0) {
        editorRef.current.deltaDecorations(decorationsRef.current, []);
      }
    };
  }, []);

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Track cursor movements
    editor.onDidChangeCursorPosition((e: any) => {
      if (onCursorMove) {
        onCursorMove({
          line: e.position.lineNumber,
          column: e.position.column,
        });
      }
    });
  };

  return (
    <div className="holo-card flex-1 flex flex-col overflow-hidden glow-purple min-h-[300px]">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2 bg-surface-editor">
        <div className="flex items-center gap-2">
          <FileCode className="h-3.5 w-3.5 text-neon-cyan" />
          <span className="font-mono text-xs">solution.cpp</span>
          <span className="text-[10px] text-muted-foreground">· C++17</span>
        </div>
        <div className="flex items-center gap-1.5">
          {remoteCursors.map((rc) => (
            <div
              key={rc.socketId}
              className="grid h-5 w-5 place-items-center rounded-full text-[8px] font-bold text-white border border-card glow-cyan"
              style={{ background: rc.color }}
              title={rc.username}
            >
              {rc.username[0].toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language="cpp"
          value={code}
          onChange={(value) => setCode(value || "")}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "JetBrains Mono",
            smoothScrolling: true,
            padding: { top: 12 },
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
          }}
        />
      </div>

      <div className="border-t border-border/50 bg-surface-editor px-4 py-2 font-mono text-xs">
        <span className="text-muted-foreground">$ </span>
        <span className="text-status-success">Collaboration Engine Online</span>
        <span className="text-muted-foreground"> · Connected · {remoteCursors.length + 1} active</span>
      </div>
    </div>
  );
}
