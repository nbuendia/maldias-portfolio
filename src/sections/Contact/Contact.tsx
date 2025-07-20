import { CONTACT_ASCII } from "@/lib/constants/ContactConstants";

import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <>
      <pre className={styles.command}>
        $ cat lets-chat.txt
      </pre>
      <pre className={styles.art}>{CONTACT_ASCII}</pre>
    </>
  )
}
