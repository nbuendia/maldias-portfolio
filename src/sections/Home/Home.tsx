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

      <br />

      <div className={styles.commandInfoContainer}>
        <span className={styles.instructions_fact}>
          This is a terminal style, interactive portfolio.
        </span>

        <span className={styles.instructions}>
          Use the commands listed below to navigate through different parts of the site.
        </span>

        <span>Available commands:</span>
        
        {TERMINAL_COMMANDS.map((command, commandKey) => (
          <span key={commandKey} className={styles.command}>
            <Icon name="terminal_2" size="16px" color="green" className={styles.commandIcon} />
            <span className={command === "home" ? styles.homeCommand : ""}>run {command}</span>
          </span>
          ))
        }
      </div>
    </div>
  )
}
