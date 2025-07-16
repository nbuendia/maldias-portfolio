'use client'

import { useGreeting } from "@/hooks";
import { NAME } from "@/lib/constants";

import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";

import styles from "./Greeting.module.css";

export default function Greeting() {
    const {showComponent, endGreeting, handleEndAnimation} = useGreeting();
    const name = NAME;
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

                        <h1 className={styles.me}>
                            {[...name].map((letter, i) => (
                                <span key={i} className={nameClasses(letter)}
                                    style={{animationDelay: `${i * 0.1 + 3}s`}}>
                                    {letter}
                                </span>
                            ))}
                        </h1>

                        <span className={styles.title} onAnimationEnd={() => handleEndAnimation()}>
                            <h3>A FRONTEND DEVELOPER</h3>
                        </span>
                    </Box>
                </Box>
            )}
        </>
    )
}
