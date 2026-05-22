"use client";

import { useToast } from "@/hooks";
// LOCAL HOOKS - MIGHT MOVE
import { useMain, useTerminalCommand } from "./hooks";

import { Toast } from "@/components/Toast";
import { Terminal } from "@/components/Terminal";
import { CommandBar } from "@/components/CommandBar";

import { Banner } from "@/sections/Banner";
import { AboutMe } from "@/sections/AboutMe";
import { Projects } from "@/sections/Projects";
import { Contact } from "@/sections/Contact";

import styles from "./Main.module.css";

export default function Main() {
  const { toasts, handleOnCloseToast } = useToast();
  const { showComponent } = useMain();
  const { terminal, handleCommand } = useTerminalCommand()

  const terminalComponentList = {
    home: <>HOME</>,
    about: <AboutMe />,
    projects: <Projects />,
    contact: <Contact />
  };

  return (
    <>
      {showComponent && (
        <>
          <Banner />
          <Terminal name={terminal} terminalComponentList={terminalComponentList} />
          <CommandBar onCommand={handleCommand} />
        </>
      )}

      {toasts.map((toast) => (
        <Toast key={toast.id} portalId={toast.id} alignment="right"
          onClose={() => handleOnCloseToast(toast.id)}>
          <div className={styles.toastContainer}>
            {toast.message.includes(":") ? (
              <>
                {toast.message.split(":")[0]}:
              
                <pre className={styles.toastMessage}>
                  {toast.message.split(":")[1]}
                </pre>
              </>
            ) : (
                <>{toast.message}</>
            )}
          </div>
        </Toast>
      ))}
    </>
  );
}
