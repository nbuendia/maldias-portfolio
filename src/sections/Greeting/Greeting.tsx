'use client'

import { useGreeting } from "@/hooks";
import { FIRST_NAME, LAST_NAME } from "@/lib/constants";

import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";

import styles from "./Greeting.module.css";

export default function Greeting() {
    const {showComponent, endGreeting, handleEndAnimation} = useGreeting();
    const firstName = FIRST_NAME;
    const lastName = LAST_NAME;
    const nameClasses = (letter: string) =>  `${styles.letter} ${letter === " " ? styles.space : ""}`;

    return (
        <>
            {showComponent && (
                <Box column className={endGreeting ? styles.end : ''}>
                    <span className={styles.hola}>
                        <h1>HOLA</h1> 
                        <Icon name="waving_hand" size="32px" className={styles.wave} />
                    </span>

                    <Box column>
                        <span className={styles.soy}>
                            <h3>I AM</h3>
                        </span>

                        <Box className={styles.me}>
                            <h1 className={styles.name}>
                                {[...firstName].map((letter, i) => (
                                    <span key={i} className={nameClasses(letter)}
                                        style={{animationDelay: `${i * 0.1 + 3}s`}}>
                                        {letter}
                                    </span>
                                ))}
                            </h1>
                            <h1 className={styles.name}>
                                {[...lastName].map((letter, i) => (
                                    <span key={i} className={nameClasses(letter)}
                                        style={{animationDelay: `${i * 0.1 + 4}s`}}>
                                        {letter}
                                    </span>
                                ))}
                            </h1>
                        </Box>

                        <span className={styles.title} onAnimationEnd={() => handleEndAnimation()}>
                            <h3>A FRONTEND DEVELOPER</h3>
                        </span>
                    </Box>
                </Box>
            )}
        </>
    )
}
