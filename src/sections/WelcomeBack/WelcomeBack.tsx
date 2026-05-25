'use client'

import {
  useReturnUser,
  useSmiley,
  useWelcomeBackAnimationEnd,
} from "./hooks";

import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";

import { BACK, WELCOME } from "@/lib/constants";

import styles from "./WelcomeBack.module.css";

export default function WelcomeBack() {
  const {smileyAnimation, handleSmileyAnimation} = useSmiley();
  const {showWelcomeBack} = useReturnUser();
  const {
    endAnimation,
    endAnimationLetterIndex,
    handleEndAnimation,
  } = useWelcomeBackAnimationEnd();
  
  const iconClasses = `${smileyAnimation ? styles.smiley : ""} ${endAnimation ? styles.fall : ""}`;
  const letterClasses = `${endAnimation ? styles.fall : styles.letter}`;
  const startLetterDelay = (key: number, delay = 0) => `${key * 0.10 + delay}s`;
  const endLetterDelay = (key: number, delay = 0) => `${(endAnimationLetterIndex - key) * 0.10 + delay}s`;

  return (
    <>
      {showWelcomeBack && (
        <Box className={styles.container}>
          <h1>
            {WELCOME.map((letter, key) => (
              <span key={key} className={letterClasses}
                style={{animationDelay: endAnimation ? endLetterDelay(key, 0.8) : startLetterDelay(key)}}>
                {letter}
              </span>
            ))}
          </h1>
          <h1>
            {BACK.map((letter, key) => (
              <span key={key} className={letterClasses} onAnimationEnd={() => handleSmileyAnimation()}
                style={{animationDelay: endAnimation ? endLetterDelay(key) : startLetterDelay(key, 0.8)}}>
                {letter}
              </span>
            ))}
          </h1>
          <Icon name="mood" size="48px" className={iconClasses} onAnimationEnd={() => handleEndAnimation()}
                style={{animationDelay: `${endAnimation ? "650ms" : 0}`}}/>
        </Box>
      )}
    </>
  )
}
