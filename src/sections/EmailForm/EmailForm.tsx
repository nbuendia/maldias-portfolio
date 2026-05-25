import { useEffect, useRef } from "react";

import { Icon } from "@/components/Icon";

import {
  useEmailReset,
  useEmailState,
  useEmail,
  useUserInfo,
  useCancelEmail,
  useSubmitEmail,
  useDisplayForm,
} from "./hooks";

import styles from "./EmailForm.module.css";

export default function EmailForm() {
  const emailForm = useRef<HTMLFormElement | null>(null);
  const {handleEmailFormReset} = useEmailReset();
  const {isSubmitDisabled, isSubmitLoading,} = useEmailState();
  const {displayForm, handleDisplayForm} = useDisplayForm();
  const {userFormInfo, handleUserInfo} = useUserInfo();
  const {handleSubmitEmail} = useSubmitEmail();
  const {handleCancelEmail} = useCancelEmail();
  
  useEmail();

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
            <input type="text" name="user_name" value={userFormInfo.userName ?? ""} onChange={(event) => handleUserInfo("userName", event.target.value)} />
          </span>

          <span id="email" className={styles.fromSubsection}>
            <span>Email: </span>
            <input type="text" name="user_email" value={userFormInfo.userEmail ?? ""} onChange={(event) => handleUserInfo("userEmail", event.target.value)} />
          </span>
          
          <span id="subject" className={styles.fromSubsection}>
            <span>Subject: </span>
            <input type="text" name="user_subject" value={userFormInfo.userSubject ?? ""} onChange={(event) => handleUserInfo("userSubject", event.target.value)} />
          </span>
          
          <span id="message" className={styles.fromSubsection}>
            <span>Message: </span>
            <textarea rows={5} name="user_message" value={userFormInfo.userMsg ?? ""} onChange={(event) => handleUserInfo("userMsg", event.target.value)} />
          </span>

          <div className={styles.buttonGroup}>
            <button className={styles.formSubmitButton} onClick={(e) => handleCancelEmail(e)}>
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
