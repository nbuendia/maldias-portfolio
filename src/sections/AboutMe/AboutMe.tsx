import { useState } from "react";
import { ABOUT_ME_ART, TECH_STACK, WHO_AM_I } from "@/lib/constants";

import { Box } from "@/components/Box";

import styles from "./AboutMe.module.css";

export default function AboutMe() {
  const [startAboutMeAnimation, setStartAboutMeAnimation] = useState(false);
  const [showAboutMeArt, setShowAboutMeArt] = useState(false);
  const [showWhoami, setShowWhoami] = useState(false);
  const [startWhoamiAnimation, setStartWhoamiAnimation] = useState(false);
  const [showTechStack, setShowTechStack] = useState(false);
  const [startTechStackAnimation, setStartTechStackAnimation] = useState(false);
  
  setTimeout(() => {
    setStartAboutMeAnimation(true);
  }, 1000);

  function handleShowAboutMeArt() {
    setShowAboutMeArt(true);

    setTimeout(() => {
      setShowWhoami(true);
    }, 2000);
  }

  function handleShowWhoami() {
    setStartWhoamiAnimation(true);

    setTimeout(() => {
      setShowTechStack(true);
    }, 6000);
  }

  function handleShowTechStack() {
    setStartTechStackAnimation(true);
  }
  
  return (
    <div id="about" className={styles.container}>
      <Box column className={styles.subContainer}>
        {startAboutMeAnimation && (
            <>
                <pre className={styles.command} onAnimationEnd={handleShowAboutMeArt}>
                    $ about-me.txt
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
                <pre className={styles.command} onAnimationEnd={handleShowTechStack}
                style={{animationDelay: "250ms"}}>
                    $ tech-stack
                </pre>
                {startTechStackAnimation && (
                    <>
                        {TECH_STACK.map((tech, lineKey) => (
                        <pre key={lineKey} className={styles.response}>
                            {tech.split("").map((letter, letterKey) => (
                                <span key={letterKey} className={styles.letter}
                                    style={{animationDelay: `${lineKey * 1 + letterKey * 0.05}s`}}>
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
