import { useEffect } from "react";

import { CONTACT_ASCII, CONTACT_INFO } from "@/lib/constants";
import { useContactMeAscii, useConactMeInfo, useContactMeEmail } from "@/hooks";

import { Icon } from "@/components/Icon";
import { EllipsisLoader } from "@/components/EllipsisLoader";

import styles from "./Contact.module.css";

export default function Contact() {
  const {showContactSection, showContactAscii, handleShowContactAscii, handleContactStateRest} = useContactMeAscii();
  const {showContactInfoSection, showContactInfo, currentContactIndex, handleShowContactInfo, handleContactInfoStateReset} = useConactMeInfo();
  const {showEmailSection, triggerNoEmail, yesEmailPrompts, triggerEmailAnimation, userInfo, noEmailResetIsLoading, handleContactStateReset} = useContactMeEmail();

  useEffect(() => {
    return () => {
      handleContactStateRest();
      handleContactInfoStateReset();
      handleContactStateReset();
    }
  }, [handleContactStateRest, handleContactInfoStateReset, handleContactStateReset]);

  return (
    <>
      {showContactSection && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowContactAscii}>
            $ cat lets-chat.txt
          </pre>
          {showContactAscii && <pre className={styles.art}>{CONTACT_ASCII}</pre>}
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
          {!noEmailResetIsLoading &&
            <pre className={`${styles.emailPrompt} ${triggerEmailAnimation ? styles.emailPromptAnimation : ""}`}>
              <Icon name="check" size="16px" color="green" className={styles.promptCheck} />
              Would you like to send me an email?
              <span className={styles.promptYesNo}>(y/n)</span>
            </pre>
          }

          {triggerNoEmail && (
            <pre className={styles.response}>
              Okay! If you change your mind, use command:<br/>
              <span className={styles.noEmail}>
                --reset send-email
              </span>
            </pre>
          )}

          {noEmailResetIsLoading && <EllipsisLoader />}

          {yesEmailPrompts.triggerYesEmail && (
            <>
              <pre className={styles.response}>
                Who is this email from?
                <span className={styles.yesEmail}>(--email &quot;your-email@snailmail.com&quot;)</span>
              </pre>

              {yesEmailPrompts.userEmailResponseIsLoading && <EllipsisLoader />}

              {yesEmailPrompts.emailError && !yesEmailPrompts.userEmailResponseIsLoading && (
                <>
                  <pre className={styles.msgError}>
                    <Icon name="warning" size="16px" color="yellow" className={styles.promptCheck} />
                    Email wasn&apos;t saved. Please make sure email is correct and command is using proper syntax.<br />
                  </pre>
                  <pre className={styles.syntaxFix}>--email &quot;me@email.com&quot;</pre>
                </>
              )}
            
              {userInfo.userEmail && !yesEmailPrompts.userEmailResponseIsLoading && (
                <pre className={styles.userResponse}>
                  <Icon name="keyboard_double_arrow_right" size="16px" className={styles.promptCheck} />
                  {userInfo.userEmail}
                </pre>
              )}

              {yesEmailPrompts.showMsgPrompt && (
                <>
                  <pre className={styles.response}>
                    What would you like to say?
                    <span className={styles.yesEmail}>(--msg &quot;Lets chat!&quot;)</span>
                  </pre>
                  
                  {yesEmailPrompts.userMsgResponseIsLoading && <EllipsisLoader />}

                  {yesEmailPrompts.msgError && !yesEmailPrompts.userMsgResponseIsLoading && (
                    <>
                      <pre className={styles.msgError}>
                        <Icon name="warning" size="16px" color="yellow" className={styles.promptCheck} />
                        Message wasn&apos;t saved. Please use the following syntax to save email message.<br />
                      </pre>
                      <pre className={styles.syntaxFix}>--msg &quot;Lets chat!&quot;</pre>
                    </>
                  )}

                  {userInfo.userMsg && !yesEmailPrompts.userMsgResponseIsLoading && (
                    <pre className={styles.userResponse}>
                      <Icon name="keyboard_double_arrow_right" size="16px" className={styles.promptCheck} />
                      {userInfo.userMsg}
                    </pre>
                  )}
                </>
              )}

              {yesEmailPrompts.showCheckPrompt && (
                <pre className={`${styles.emailPrompt} ${yesEmailPrompts.triggerCheckAnimation ? styles.emailPromptAnimation : ""}`}>
                  <Icon name="check" size="16px" color="green" className={styles.promptCheck} />
                  Does the information above look correct?
                  <span className={styles.promptYesNo}>(y/n)</span>
                </pre>
              )}

              {yesEmailPrompts.showConfirmPrompt && (
                <pre className={styles.userResponse}>
                  <Icon name="keyboard_double_arrow_right" size="16px" className={styles.promptCheck} />
                  Your email has been Sent!
                </pre>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
