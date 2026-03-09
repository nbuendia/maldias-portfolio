import styles from "./Terminal.module.css";

import { useTerminalView } from "../Main/hooks";

import { Box } from "@/components/Box";
import { AboutMe } from "@/sections/AboutMe";
import { Projects } from "@/sections/Projects";
import { Contact } from "@/sections/Contact";

export default function Terminal() {
  const {terminalView, handleTerminalView} = useTerminalView();

  const activeComponent = 
    terminalView === "home" ? <>HOME</> 
    : terminalView === "about" ? <AboutMe /> 
    : terminalView === "projects" ? <Projects /> 
    : terminalView === "contact" ? <Contact />
    : null;

  return (
    <Box className={styles.container}>
      <Box column square className={styles.terminal}>
        {activeComponent}
      </Box>
    </Box>
  )
}
