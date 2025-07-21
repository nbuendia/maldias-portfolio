import { useEffect } from "react";

import { CONTACT_ASCII, CONTACT_INFO } from "@/lib/constants";
import { useContactMeAscii, useConactMeInfo } from "@/hooks";

import styles from "./Contact.module.css";

export default function Contact() {
  const {showContactSection, showContactAscii, handleShowContactAscii, handleContactStateRest} = useContactMeAscii();
  const {showContactInfoSection, showContactInfo, currentContactIndex, handleShowContactInfo, handleContactInfoStateReset} = useConactMeInfo();
  
  useEffect(() => {
    return () => {
      handleContactStateRest();
      handleContactInfoStateReset();
    }
  }, [handleContactStateRest, handleContactInfoStateReset]);

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
    </>
  )
}
