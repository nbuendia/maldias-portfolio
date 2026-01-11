import { useEffect } from "react";

import { UserInfo } from "@/features/EmailForm";
import { useEmailForm } from "@/hooks";

import { Icon } from "@/components/Icon";

import styles from "./EmailForm.module.css";

interface EmailFormProps {
  onSubmit: (userFormInfo: UserInfo) => void;
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const {userFormInfo, isSubmitDisabled, displayForm, handleSetUserInfo, handleCancelEmail, handleDisplayForm, handleEmailFormReset} = useEmailForm();
  
  useEffect(() => {
    return () => {
      handleEmailFormReset();
    }
  }, [handleEmailFormReset]);

  return (
    <div className={`${styles.container} ${styles.backgroundBlurAnimation}`} onAnimationEnd={() => handleDisplayForm(true)}>
      {displayForm && (
        <div className={`${styles.formContainer} ${styles.formOpenAnimation}`}>
        <span className={styles.fromSubsection}>
          <span>Name: </span>
          <input type="text" value={userFormInfo.userName ?? ""} onChange={(event) => handleSetUserInfo("userName", event.target.value)} />
        </span>

        <span className={styles.fromSubsection}>
          <span>Email: </span>
          <input type="text" value={userFormInfo.userEmail ?? ""} onChange={(event) => handleSetUserInfo("userEmail", event.target.value)} />
        </span>
        
        <span className={styles.fromSubsection}>
          <span>Message: </span>
          <textarea rows={5} value={userFormInfo.userMsg ?? ""} onChange={(event) => handleSetUserInfo("userMsg", event.target.value)} />
        </span>

        <div className={styles.buttonGroup}>
          <button className={styles.formSubmitButton} onClick={handleCancelEmail}>
            <Icon name="close" size="16px" />
            <span className={styles.buttonLabel}>Cancel</span>
          </button>

          <button className={styles.formSubmitButton} disabled={isSubmitDisabled} onClick={() => onSubmit(userFormInfo)}>
            <span className={styles.buttonLabel}>Send Email</span>
            <Icon name="mail" size="16px" />
          </button>
        </div>
      </div>
      )}
    </div>
  )
}
