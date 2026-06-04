import { useEffect } from "react";

import {
  useAboutMeReset,
  useAboutMeState,
  useAboutMeText,
  useTechStack
} from "./hooks";

import {
  TECH_STACK_COMMAND,
  WHO_AM_I,
  WHOAMI_COMMAND,
  TECH_STACK,
} from "./utils";

import { Icon } from "@/components/Icon";

import styles from "./AboutMe.module.css";

export default function AboutMe() {  
  const {handleAboutMeStateReset} = useAboutMeReset();
  const {handleShowWhoami} = useAboutMeText();
  const {startTechStackAnimation, handleSetStartTechStackAnimation} = useTechStack();
  
  const {
    showWhoami,
    startWhoamiAnimation,
    showTechStack,
  } = useAboutMeState();

  useEffect(() => {   
    return () => handleAboutMeStateReset();
  }, [handleAboutMeStateReset]);

  return (
    <div id="about" className={styles.container}>
      {showWhoami && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowWhoami}>
            <Icon name="terminal_2" size="16px" color="green" className={styles.commandIcon} />
            {WHOAMI_COMMAND.split("").map((letter, idx) => (
              <span key={idx} className={styles.letter} style={{animationDelay: `${idx * 0.1}s`}}>
                {letter}
              </span>
            ))}
          </pre>
            
          {startWhoamiAnimation && (
            <pre className={styles.whoamiInfo}>
              {WHO_AM_I}
            </pre>
          )}
        </>
      )}

      <br />

      {showTechStack && (
        <>
          <pre className={styles.command} style={{marginBottom: "2em"}} onAnimationEnd={handleSetStartTechStackAnimation}>
            <Icon name="terminal_2" size="16px" color="green" className={styles.commandIcon} />
            
            {TECH_STACK_COMMAND.split("").map((letter, idx) => (
              <span key={idx} className={styles.letter} style={{animationDelay: `${idx * 0.1}s`}}>
                {letter}
              </span>
            ))}
          </pre>
          
          {startTechStackAnimation && (
            <pre className={styles.techStackContainer}>
              {TECH_STACK.map((techList, key) => (
                <div key={key} className={styles.techStackBlock}>
                  <span className={styles.techStackBlockLabel}>
                    <Icon name={techList.icon} size="14px" color="whitesmoke" className={styles.commandIcon} />
                    {techList.label}
                  </span>

                  {techList.list.map((tech, idx) => (
                    <span key={idx}>
                      {tech}
                    </span>
                  ))}
                </div>
              ))}
            </pre>
          )}
        </>
      )}
    </div>
  );
}
