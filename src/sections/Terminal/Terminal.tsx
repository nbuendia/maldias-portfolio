import styles from "./Terminal.module.css";


import { Box } from "@/components/Box";
import { AboutMe } from "@/sections/AboutMe";
import { Projects } from "@/sections/Projects";
import { Contact } from "@/sections/Contact";
import { useTerminal } from "./hooks";

export default function Terminal() {
  const {terminal, handleTerminalView} = useTerminal();

  const activeComponent = 
    terminal === "home" ? <>HOME</> 
    : terminal === "about" ? <AboutMe /> 
    : terminal === "projects" ? <Projects /> 
    : terminal === "contact" ? <Contact />
    : null;

  return (
    <Box className={styles.container}>
      <Box column square className={styles.terminal}>
        {activeComponent}
      </Box>
    </Box>
  )
}
