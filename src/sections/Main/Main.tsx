"use client";

import { useAboutMeTxt, useContactMeEmail, useMain, useToast } from "@/hooks";

import { CommandBar } from "@/components/CommandBar";
import { Box } from "@/components/Box";
import { Toast } from "@/components/Toast";
import { Banner } from "@/sections/Banner";
import { AboutMe } from "@/sections/AboutMe";
import { Projects } from "@/sections/Projects";
import { Contact } from "@/sections/Contact";

import styles from "./Main.module.css";

export default function Main() {
  const {toasts, handleOnCloseToast} = useToast();
  const {showComponent, terminalView, handleTerminalView} = useMain();
  const {handleContactCommand} = useContactMeEmail();
  const {handleAboutCommand} = useAboutMeTxt();

  function handleCommand(cmd: string) {
    const runMatch = cmd.match(/^run (.+)$/i);
    const terminal = runMatch && runMatch[1].toLowerCase();
    
    if (runMatch && terminal) handleTerminalView(terminal);

    switch (terminalView) {
      case "about":
        handleAboutCommand(cmd);
        break;
      case "projects":
        // handleProjectsCommand(cmd);
        break;
      case "contact":
        handleContactCommand(cmd);
        break;
      default:
        break;
    }
  }

  return (
    <>
      {showComponent && (
        <>
          <Banner />

          <Box className={styles.contentContainer}>
            <Box column className={styles.terminal}>
              {terminalView === "home" ?
                <>HOME</>
                : terminalView === "about" ?
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

        {toasts.map((toast) => (
          <Toast key={toast.id} portalId={toast.id} alignment="right"
            onClose={() => handleOnCloseToast(toast.id)}>
            <div className={styles.toastContainer}>
              <>{toast.message.split(":")[0]}:</>
              
              <pre className={styles.toastMessage}>
                {toast.message.split(":")[1]}
              </pre>
            </div>
          </Toast>
        ))}
    </>
  );
}
