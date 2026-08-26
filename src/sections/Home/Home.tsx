import { Icon } from "@/components/Icon";

import { useDeviceCheck } from "@/hooks";

import {
  TERMINAL_COMMANDS,
  INTRO,
  INSTRUCTIONS_PT_ONE,
  INSTRUCTIONS_PT_TWO,
  INSTRUCTIONS_PT_TWO_MOBILE,
} from "./utils";

import styles from "./Home.module.css";

export default function Home() {
  const {isMobileOrTablet} = useDeviceCheck();

  const instructionsContainerClasses = `${styles.instructionsContainer} ${isMobileOrTablet ? styles.instructionsContainerMobile : ""}`;

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <pre className={styles.title}>Software Developer</pre>
        {INTRO}
      </div>

      <div className={instructionsContainerClasses}>
        <span className={styles.title}>
          How To Navigate:
        </span>

        <span className={styles.instructions}>
          {INSTRUCTIONS_PT_ONE}
        </span>

        <span>
          {!isMobileOrTablet && INSTRUCTIONS_PT_TWO + INSTRUCTIONS_PT_TWO_MOBILE}
          {isMobileOrTablet && INSTRUCTIONS_PT_TWO_MOBILE[0].toUpperCase() + INSTRUCTIONS_PT_TWO_MOBILE.slice(1)}
        </span>
      </div>

      {!isMobileOrTablet && 
        <div className={styles.commandListContainer}>
          <span className={styles.title}>
            Available commands:
          </span>
          
          {TERMINAL_COMMANDS.map((command, commandKey) => (
            <span key={commandKey} className={styles.command}>
              <Icon name="terminal_2" size="16px" color="green" className={styles.commandIcon} />
              <span>run {command}</span>
            </span>
            ))
          }
        </div>
      }
    </div>
  )
}
