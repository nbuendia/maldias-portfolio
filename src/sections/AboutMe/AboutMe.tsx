import { useEffect, useRef } from "react";

import { ABOUT_ME_ART, TECH_STACK, WHO_AM_I } from "@/lib/constants";
import { useAsciiScroll } from "@/hooks";
import {
  useAboutMeReset,
  useAboutMeState,
  useAboutMeText,
  useTechStack
} from "./hooks";

import styles from "./AboutMe.module.css";

export default function AboutMe() {
  const projectContainerRef = useRef(null);
  
  const {handleAboutMeStateReset, handleAboutMeAsciiStateReset, handleTechStackStateReset} = useAboutMeReset();
  const {handleShowAboutMeAscii, setStartAsciiScrollAnim, handleShowWhoami} = useAboutMeText();
  const {startTechStackAnimation, currentTechIndex, handleSetStartTechStackAnimation} = useTechStack();
  
  const {
    startAboutMeAnimation,
    showAboutMeArt,
    startAsciiScrollAnim,
    showWhoami,
    startWhoamiAnimation,
    showTechStack,
  } = useAboutMeState();

  useAsciiScroll(projectContainerRef, setStartAsciiScrollAnim);

  useEffect(() => {   
    return () => {
      handleAboutMeStateReset();
      handleAboutMeAsciiStateReset();
      handleTechStackStateReset();
    }
  }, [handleAboutMeStateReset, handleAboutMeAsciiStateReset, handleAboutMeAsciiStateReset]);

  return (
    <div id="about" ref={projectContainerRef} className={styles.container}>
      {startAboutMeAnimation && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowAboutMeAscii}>
            $ cat about-me.txt
          </pre>

          {showAboutMeArt && <pre id="art" className={`${styles.art} ${startAsciiScrollAnim && "artAnim"}`}>{ABOUT_ME_ART}</pre>}
        </>
      )}

      <br />

      {showWhoami && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowWhoami} style={{animationDelay: "250ms"}}>
            $ whoami
          </pre>
            
          {startWhoamiAnimation && (
            <pre className={styles.response}>
              {WHO_AM_I.split("").map((letter, key) => (
                <span key={key} className={styles.letter} style={{animationDelay: `${key * 0.1}s`}}>
                  {letter}
                </span>
              ))}
            </pre>
          )}
        </>
      )}

      <br />

      {showTechStack && (
        <>
          <pre className={styles.command} onAnimationEnd={handleSetStartTechStackAnimation} style={{animationDelay: "250ms"}}>
            $ tech-stack
          </pre>
          
          {startTechStackAnimation && (
            <>
              {TECH_STACK.slice(0, currentTechIndex + 1).map((tech, lineKey) => (
                <pre key={lineKey} className={styles.response}>
                  {tech.split("").map((letter, letterKey) => (
                    <span key={letterKey} className={styles.letter} style={{animationDelay: `${letterKey * 0.05}s`}}>
                      {letter}
                    </span>
                  ))}
                </pre>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
