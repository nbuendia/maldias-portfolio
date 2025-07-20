import { useEffect, useState } from "react";

import { CONTACT_ASCII, CONTACT_INFO } from "@/lib/constants/ContactConstants";

import styles from "./Contact.module.css";

export default function Contact() {
  const [showContactSection, setShowContactSection] = useState(false);
  const [showContactAscii, setShowContactAscii] = useState(false);
  const [showContactInfoSection, setShowContactInfoSection] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [currentContactIndex, setCurrentContactIndex] = useState(-1);
  
  useEffect(() => {
    return () => {
      setShowContactSection(false);
      setShowContactInfoSection(false);
    }
  }, [setShowContactSection, setShowContactInfoSection]);

  useEffect(() => {
    const showContactSectionTimeout = setTimeout(() => {
      setShowContactSection(true);
    }, 1000);

    return () => clearTimeout(showContactSectionTimeout);
  }, []);

  useEffect(() => {
    const delay = currentContactIndex === -1 ? 500 
      : currentContactIndex === 0 ? 2000 : 2500;
    
    if (!showContactInfo) return;

    if (currentContactIndex < CONTACT_INFO.length - 1) {
      const currentContactIndexTimeout = setTimeout(() => {
        setCurrentContactIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(currentContactIndexTimeout);
    }
  });

  function handleShowContactAscii() {
    setShowContactAscii(true);

    const showContactInfoSectionTimeout = setTimeout(() => {
      setShowContactInfoSection(true);
    }, 1000);

    return () => clearTimeout(showContactInfoSectionTimeout)
  }

  function handleShowContactInfo() {
    setShowContactInfo(true);
  }

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
