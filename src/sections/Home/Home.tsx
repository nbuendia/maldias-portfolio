import { Icon } from "@/components/Icon";

import { TERMINAL_COMMANDS } from "./utils";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <pre className={styles.title}>Software Developer</pre>
        Frontend focused software developer with experience building fullstack web applications, internal tools and intuitive user interfaces.
      </div>

      <div className={styles.instructionsContainer}>
        <span className={styles.title}>
          How To Navigate:
        </span>

        <span className={styles.instructions}>
          This is a terminal style, interactive portfolio.
        </span>

        <span>
          Type commands in input below or use the dropdown on the upper right of the terminal to navigate through different parts of the site.
        </span>
      </div>

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
    </div>
  )
}
