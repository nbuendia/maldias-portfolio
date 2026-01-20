import { useEffect, useRef } from "react";

import { useEmailForm } from "@/hooks";

import { Icon } from "@/components/Icon";

import styles from "./EmailForm.module.css";

export default function EmailForm() {
  const emailForm = useRef<HTMLFormElement | null>(null);
  const {userFormInfo, isSubmitDisabled, displayForm, isSubmitLoading, handleSetUserInfo, handleCancelEmail, handleDisplayForm, handleSubmitEmail, handleEmailFormReset} = useEmailForm();

  useEffect(() => {
    return () => handleEmailFormReset();
  }, [handleEmailFormReset]);

  return (
    <div className={`${styles.container} ${styles.backgroundBlurAnimation}`} onAnimationEnd={() => handleDisplayForm(true)}>
      {displayForm && (
        <form ref={emailForm} className={`${styles.formContainer} ${styles.formOpenAnimation}`}>
          {isSubmitLoading && (
            <div className={styles.loadingSpinnerContainer}>
              <Icon name="progress_activity" size="18px" color="white" className={styles.loadingSpinner}/>
            </div>
          )}

          <span id="name" className={styles.fromSubsection}>
            <span>Name: </span>
            <input type="text" name="user_name" value={userFormInfo.userName ?? ""} onChange={(event) => handleSetUserInfo("userName", event.target.value)} />
          </span>

          <span id="email" className={styles.fromSubsection}>
            <span>Email: </span>
            <input type="text" name="user_email" value={userFormInfo.userEmail ?? ""} onChange={(event) => handleSetUserInfo("userEmail", event.target.value)} />
          </span>
          
          <span id="subject" className={styles.fromSubsection}>
            <span>Subject: </span>
            <input type="text" name="user_subject" value={userFormInfo.userSubject ?? ""} onChange={(event) => handleSetUserInfo("userSubject", event.target.value)} />
          </span>
          
          <span id="message" className={styles.fromSubsection}>
            <span>Message: </span>
            <textarea rows={5} name="user_message" value={userFormInfo.userMsg ?? ""} onChange={(event) => handleSetUserInfo("userMsg", event.target.value)} />
          </span>

          <div className={styles.buttonGroup}>
            <button className={styles.formSubmitButton} onClick={handleCancelEmail}>
              <Icon name="close" size="16px" />
              <span className={styles.buttonLabel}>Cancel</span>
            </button>

            <button className={styles.formSubmitButton} disabled={isSubmitDisabled} onClick={(e) => handleSubmitEmail(e, emailForm)}>
              <span className={styles.buttonLabel}>Send Email</span>
              <Icon name="mail" size="16px" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
