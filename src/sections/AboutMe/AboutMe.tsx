import { ABOUT_ME_ART, TECH_STACK, WHO_AM_I } from "@/lib/constants";
import { useAboutMeTxt, useTechStack, useWhoami } from "@/hooks";

import { Box } from "@/components/Box";

import styles from "./AboutMe.module.css";

export default function AboutMe() {
  const {startAboutMeAnimation, showAboutMeArt, handleShowAboutMeArt} = useAboutMeTxt();
  const {showWhoami, startWhoamiAnimation, handleShowWhoami} = useWhoami();
  const {showTechStack, startTechStackAnimation, currentTechIndex, handleSetStartTechStackAnimation} = useTechStack();
  
  return (
    <div id="about" className={styles.container}>
      <Box column className={styles.subContainer}>
        {startAboutMeAnimation && (
            <>
                <pre className={styles.command} onAnimationEnd={handleShowAboutMeArt}>
                    $ cat about-me.txt
                </pre>
                {showAboutMeArt && <pre className={styles.art}>{ABOUT_ME_ART}</pre>}
            </>
        )}

        <br />

        {showWhoami && (
            <>
                <pre className={styles.command} onAnimationEnd={handleShowWhoami}
                    style={{animationDelay: "250ms"}}>
                    $ whoami
                </pre>
                {startWhoamiAnimation && (
                    <>
                        <pre className={styles.response}>
                            {WHO_AM_I.split("").map((letter, key) => (
                                <span key={key} className={styles.letter}
                                    style={{animationDelay: `${key * 0.1}s`}}>
                                    {letter}
                                </span>
                            ))}
                        </pre>
                    </>
                )}
            </>
        )}

        <br />

        {showTechStack && (
            <>
                <pre className={styles.command} onAnimationEnd={handleSetStartTechStackAnimation}
                style={{animationDelay: "250ms"}}>
                    $ tech-stack
                </pre>
                {startTechStackAnimation && (
                    <>
                        {TECH_STACK.slice(0, currentTechIndex + 1).map((tech, lineKey) => (
                            <pre key={lineKey} className={styles.response}>
                                {tech.split("").map((letter, letterKey) => (
                                    <span key={letterKey} className={styles.letter}
                                        style={{animationDelay: `${letterKey * 0.05}s`}}>
                                        {letter}
                                    </span>
                                ))}
                            </pre>
                        ))}
                    </>
                )}
            </>
        )}
      </Box>
    </div>
  );
}
