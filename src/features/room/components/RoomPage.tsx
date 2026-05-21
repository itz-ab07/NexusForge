import { CodeEditorPanel } from "./CodeEditorPanel";
import { CopilotPanel } from "./CopilotPanel";
import { ProblemPanel } from "./ProblemPanel";
import { RoomHeader } from "./RoomHeader";
import { SquadPanel } from "./SquadPanel";
import { TeamChatPanel } from "./TeamChatPanel";

export function RoomPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <RoomHeader />
      <div className="flex-1 grid grid-cols-12 gap-3 p-3 min-h-0">
        <SquadPanel />
        <main className="col-span-12 md:col-span-7 flex flex-col gap-3 min-w-0">
          <ProblemPanel />
          <CodeEditorPanel />
        </main>
        <aside className="col-span-12 md:col-span-3 flex flex-col gap-3 min-h-0">
          <CopilotPanel />
          <TeamChatPanel />
        </aside>
      </div>
    </div>
  );
}
