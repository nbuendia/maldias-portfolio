import { useEffect, useState } from "react";
import { UserInfo } from "@/features/ContactMe";

import { Icon } from "@/components/Icon";

import styles from "./EmailForm.module.css";

interface EmailFormProps {
  onSubmit: (userFormInfo: UserInfo) => void;
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [userFormInfo, setUserFormInfo] = useState<UserInfo>({} as UserInfo);

  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    if (nameValue && emailValue && messageValue) {
      setUserFormInfo({
        userName: nameValue,
        userEmail: emailValue,
        userMsg: messageValue,
      })
    }
  }, [nameValue, emailValue, messageValue]);

  return (
    <div className={`${styles.container} ${styles.backgroundBlurAnimation}`} onAnimationEnd={() => setDisplayForm(true)}>
      {displayForm && (
        <div className={`${styles.formContainer} ${styles.formOpenAnimation}`}>
        <span className={styles.fromSubsection}>
          <span>Name: </span>
          <input type="text" value={nameValue} onChange={(event) => setNameValue(event .target.value)} />
        </span>

        <span className={styles.fromSubsection}>
          <span>Email: </span>
          <input type="text" value={emailValue} onChange={(event) => setEmailValue(event.target.value)} />
        </span>
        
        <span className={styles.fromSubsection}>
          <span>Message: </span>
          <textarea rows={5} value={messageValue} onChange={(event) => setMessageValue(event.target.value)} />
        </span>

        <button className={styles.formSubmitButton} onClick={() => onSubmit(userFormInfo)}>
          Send Email
          <Icon name="mail" size="16px" />
        </button>
      </div>
      )}
    </div>
  )
}
