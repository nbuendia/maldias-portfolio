import { useEffect, useRef } from "react";

import { useEllipsis } from "@/hooks";
import {
  useContact,
  useContactEmail,
  useContactReset,
  useContactState,
  useYesEmail,
} from "./hooks";

import {
  CONTACT_INFO,
  CONTACT_INFO_COMMAND,
  EMAIL_SENT_TOOLTIP_MSG,
} from "./utils";

import { Icon } from "@/components/Icon";
import { EllipsisLoader } from "@/components/EllipsisLoader";
import { Tooltip } from "@/components/Tooltip";
import { TyperwriterText } from "@/components/TyperwriterText";
import { EmailForm } from "@/sections/EmailForm";

import styles from "./Contact.module.css";

export default function Contact() {
  const projectContaienrRef = useRef(null);
  const {showEllipsis} = useEllipsis();
  const {handleContactStateReset} = useContactReset();
  const {
    showContactInfoSection,
    showContactInfo,
    showEmailSection,
    sendEmailPrompts,
    noEmailPrompts,
  } = useContactState();
  const {handleShowContactInfo} = useContact();
  const {yesEmailPrompts} = useYesEmail();
  const {handleBlurAction} = useContactEmail();

  useEffect(() => {
    return () => handleContactStateReset();
  }, [handleContactStateReset]);

  return (
    <div id="contact" ref={projectContaienrRef} className={styles.container}>
      {showContactInfoSection && (
        <>
          <TyperwriterText text={CONTACT_INFO_COMMAND} handleOnAnimationEnd={handleShowContactInfo} />
          
          {showContactInfo && (
            <pre className={styles.contactInfoSection}>
              {CONTACT_INFO.map((info, idx) => (
                <span key={idx} className={styles.contactInfo}>
                  <Icon name={info.icon} color={"whitesmoke"} size="16px" className={styles.commandIcon} />
                  
                  <pre className={styles.contactInfoLabel}>{info.label}: </pre>
                  {info.label === "Name" ? (
                    <span>{info.info}</span>
                  ) : (
                    <a href={info.info} target="_blank" className={styles.contactLink}>
                      {info.info}
                    </a>
                  )}
                </span>
              ))}
            </pre>
          )}
        </>
      )}

      <br />

      {showEmailSection && (
        <>
          {showEllipsis && <EllipsisLoader />}

          {sendEmailPrompts.sendEmailPrompt &&
            // MOVE "ON ANIMATION END" TO EMAIL FORM COMPONENT
            <pre className={`${styles.emailPrompt} ${sendEmailPrompts.triggerEmailAnimation ? styles.emailPromptAnimation : ""}`} onAnimationEnd={handleBlurAction}>
              <Icon name="check" size="16px" color="green" className={styles.promptCheck} />
              Would you like to send me an email?
              <span className={styles.promptYesNo}>(y/n)</span>
            </pre>
          }

          {noEmailPrompts.triggerNoEmail && (
            <pre className={styles.response}>
              Okay! If you change your mind, use command:<br/>
              <span className={styles.noEmail}>
                --reset send-email
              </span>
            </pre>
          )}

          {sendEmailPrompts.sentEmailConfrimation && (
            <pre className={styles.confrimation}>
              Your email has been sent!

              <Tooltip message={EMAIL_SENT_TOOLTIP_MSG} position="right">
                <Icon name="info" size="16px" className={styles.info} />
              </Tooltip>
            </pre>
          )}

          {yesEmailPrompts.triggerYesEmail && (
            <EmailForm /> 
          )}
        </>
      )}
    </div>
  )
}
