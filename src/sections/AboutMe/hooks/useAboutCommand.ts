import { useToast } from "@/hooks/useToast";

export function useAboutCommand() {
  const { handleToast } = useToast();

  function handleAboutCommand (cmd: string) {
    const runMatch = cmd.match(/^run (.+)$/i);

    if (!runMatch) handleToast(`Unknown command was entered: ${cmd}`);
  }

  return { handleAboutCommand };
}
