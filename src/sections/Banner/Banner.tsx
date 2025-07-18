'use client'

import { FIRST_NAME, LAST_NAME } from "@/lib/constants";

import { Box } from "@/components/Box";

import styles from "./Banner.module.css";

export default function Banner() {
    return (
        <header className={styles.container}>
            <Box column className={styles.subContainer}>
                <h1 className={styles.name}>
                    {FIRST_NAME} {LAST_NAME}
                </h1>
                
                <h4 className={styles.bio}>
                    Frontend Engineer. Space Enthusiast. Pixel Pusher.
                </h4>
            </Box>
        </header>
    )
}
