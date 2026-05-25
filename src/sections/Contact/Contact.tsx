import { useEffect, useRef } from "react";

import { CONTACT_ASCII, CONTACT_INFO } from "@/lib/constants";
import { useAsciiScroll, useEllipsis } from "@/hooks";
import {
  useContact,
  useContactEmail,
  useContactReset,
  useContactState,
  useCurrentContactIndex,
} from "./hooks";

import { Icon } from "@/components/Icon";
import { EllipsisLoader } from "@/components/EllipsisLoader";
import { EmailForm } from "@/sections/EmailForm";

import styles from "./Contact.module.css";

export default function Contact() {
  const projectContaienrRef = useRef(null);
  const { showEllipsis } = useEllipsis();
  const {handleContactStateReset} = useContactReset();
  const {
    showContactSection,
    showContactAscii,
    showContactInfoSection,
    showContactInfo,
    currentContactIndex,
    showEmailSection,
    startAsciiScrollAnim,
    sendEmailPrompts,
    noEmailPrompts,
    yesEmailPrompts,
  } = useContactState();
  const {
    setStartAsciiScrollAnim,
    handleShowContactAscii,
    handleShowContactInfo,
  } = useContact();
  useCurrentContactIndex();
  const {handleBlurAction} = useContactEmail();

  useAsciiScroll(projectContaienrRef, setStartAsciiScrollAnim);

  useEffect(() => {
    return () => handleContactStateReset();
  }, [handleContactStateReset]);

  return (
    <div id="contact" ref={projectContaienrRef} className={styles.container}>
      {showContactSection && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowContactAscii}>
            $ cat lets-chat.txt
          </pre>
          {showContactAscii && <pre id="art" className={`${styles.art} ${startAsciiScrollAnim && "artAnim"}`}>{CONTACT_ASCII}</pre>}
        </>
      )}

      <br />

      {showContactInfoSection && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowContactInfo}
            style={{animationDelay: "250ms"}}>
              $ cat contcact-info.txt
          </pre>
          {showContactInfo && (
            <>
              {CONTACT_INFO.slice(0, currentContactIndex + 1).map((info, infoKey) => (
                <pre key={infoKey} className={styles.response}>
                  {info.split("").map((letter, letterKey) => (
                    <span key={letterKey} className={styles.letter} 
                        style={{animationDelay: `${letterKey * 0.05}s`}}>
                      {letter}
                    </span>
                  ))}
                </pre>
              ))}
            </>
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
                {/* UPDATE THIS TO INCLUDE "SEND-EMAIL" -- RESET WORKS WITHOUT IT */}
                --reset send-email
              </span>
            </pre>
          )}

          {sendEmailPrompts.sentEmailConfrimation && (
            <pre className={styles.confrimation}>
              Your email has been sent!
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
