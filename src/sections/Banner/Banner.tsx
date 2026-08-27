'use client'

import { useDeviceCheck, useOrientation } from "@/hooks";
import { FIRST_NAME, LAST_NAME } from "@/lib/constants";

import { Box } from "@/components/Box";

import styles from "./Banner.module.css";

export default function Banner() {
  const {isMobileOrTablet} = useDeviceCheck();
  const {orientation} = useOrientation();

  const containerClasses = `${styles.container} ${orientation.orientation === "landscape" && isMobileOrTablet ? styles.orientation : ""}`;

  return (
    <header className={containerClasses}>
      <Box column className={styles.subContainer}>
        <h1 className={styles.name}>
          {FIRST_NAME} {LAST_NAME}
        </h1>
                
        <h4 className={styles.bio}>
          I make websites that feel like magic.
        </h4>
      </Box>
    </header>
  )
}
