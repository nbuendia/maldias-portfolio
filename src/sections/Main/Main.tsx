"use client";

import { useState } from "react";

import { useGreeting } from "@/hooks";

import { CommandBar } from "@/components/CommandBar";
import { Box } from "@/components/Box";
import { Banner } from "@/sections/Banner";
import { AboutMe } from "@/sections/AboutMe";
import { Projects } from "@/sections/Projects";
import { Contact } from "@/sections/Contact";

import styles from "./Main.module.css";

export default function Main() {
  const {showComponent} = useGreeting();
  const [terminalView, setTerminalView] = useState('about');

  function handleCommand(cmd: string) {
    const terminals = ["about", "projects", "contact"];
    const match = cmd.match(/^run (.+)$/i);
    
    if (match && terminals.includes(match[1].toLowerCase()))
      setTerminalView(match[1].toLowerCase());
    else console.warn(`Unknown command: "${cmd}"`);
  }

  return (
    <>
      {!showComponent && (
        <>
          <Banner />

          <Box className={styles.contentContainer}>
            <Box column className={styles.terminal}>
              {terminalView === "about" ?
                <AboutMe />
                : terminalView === "projects" ?
                <Projects /> 
                : terminalView === "contact" ?
                <Contact /> :
                null
              }
            </Box>
          </Box>
          
          <CommandBar onCommand={handleCommand} />
        </>
      )}
    </>
  );
}
