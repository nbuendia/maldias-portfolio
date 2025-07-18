"use client";

import { useGreeting } from "@/hooks";

import { CommandBar } from "@/components/CommandBar";
import { Box } from "@/components/Box";
import { Banner } from "@/sections/Banner";

import styles from "./Main.module.css";

export default function Main() {
  const {showComponent} = useGreeting();
  
  function handleCommand(cmd: string) {
    const match = cmd.match(/^go (.+)$/i);

    if (match) {
      const elementId = match[1].toLowerCase();
      const element = document.getElementById(elementId);

      if (element) element.scrollIntoView({behavior: "smooth"});
      else console.warn(`Section with id ${elementId} not found.`);
    }
    else console.warn(`Unknown command: "${cmd}"`);
  }

  return (
    <>
      {!showComponent && (
        <>
          <Banner />

          <Box className={styles.contentContainer}>
            <div id="about">ABOUT </div>
            <div id="projects">PROJECTS</div>
            <div id="contact">CONTACT</div>
          </Box>
          
          <CommandBar onCommand={handleCommand} />
        </>
      )}
    </>
  );
}
