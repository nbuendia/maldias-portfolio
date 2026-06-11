"use client";

import { useToast } from "@/hooks";
import { useMain, useMenuClick, useTerminalCommand } from "./hooks";
import { COMMAND_LIST } from "./utils";

import { Toast } from "@/components/Toast";
import { Terminal } from "@/components/Terminal";
import { CommandBar } from "@/components/CommandBar";
import { DropDown } from "@/components/DropDown";

import { Banner } from "@/sections/Banner";
import { Home } from "@/sections/Home";
import { AboutMe } from "@/sections/AboutMe";
import { Projects } from "@/sections/Projects";
import { Contact } from "@/sections/Contact";

import styles from "./Main.module.css";

export default function Main() {
  const { toasts, handleOnCloseToast } = useToast();
  const { showComponent } = useMain();
  const { terminal, handleCommand } = useTerminalCommand()
  const {
    input,
    setInput,
    handleMenuItemClick,
  } = useMenuClick(handleCommand);

  const terminalComponentList = {
    home: <Home />,
    about: <AboutMe />,
    projects: <Projects />,
    contact: <Contact />
  };

  return (
    <>
      {showComponent && (
        <>
          <Banner />

          <Terminal name={terminal} terminalComponentList={terminalComponentList}>
            <DropDown label="COMMAND LIST" menuItems={COMMAND_LIST} handleMenuItemClick={handleMenuItemClick} />
          </Terminal>

          <CommandBar input={input} onChange={setInput} onCommand={handleCommand} />
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
