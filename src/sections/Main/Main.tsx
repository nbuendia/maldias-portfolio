"use client";

import { useState } from "react";

import { useContactMeEmail, useGreeting } from "@/hooks";

import { CommandBar } from "@/components/CommandBar";
import { Box } from "@/components/Box";
import { Banner } from "@/sections/Banner";
import { AboutMe } from "@/sections/AboutMe";
import { Projects } from "@/sections/Projects";
import { Contact } from "@/sections/Contact";

import styles from "./Main.module.css";

export default function Main() {
  const {showComponent} = useGreeting();
  const {handleContactCommand} = useContactMeEmail();

  const [terminalView, setTerminalView] = useState('about');

  function handleCommand(cmd: string) {
    const contactCmd = cmd.trim().toLowerCase();
    const terminals = ["about", "projects", "contact"];
    const match = cmd.match(/^run (.+)$/i);
    
    if (match && terminals.includes(match[1].toLowerCase())) {
      setTerminalView(match[1].toLowerCase());
      return
    }

    switch (terminalView) {
      case "about":
        // handleAboutCommand(cmd);
        break;
      case "projects":
        // handleProjectsCommand(cmd);
        break;
      case "contact":
        handleContactCommand(contactCmd);
        break;
      default:
        console.warn(`Unknown command: "${cmd}"`);
        break;
    }
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
