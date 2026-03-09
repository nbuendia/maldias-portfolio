import { JSX } from "react";

import { Box } from "@/components/Box";

import styles from "./Terminal.module.css";

interface TerminalProps {
  name: string;
  terminalComponentList: { [key: string]: JSX.Element };
}

export default function Terminal({ name, terminalComponentList }: TerminalProps) {
  const activeComponent = terminalComponentList[name as keyof typeof terminalComponentList];
  
  return (
    <Box className={styles.container}>
      <Box column square className={styles.terminal}>
        {activeComponent}
      </Box>
    </Box>
  )
}
