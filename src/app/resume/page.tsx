import styles from "./resume.module.css";

export default function Resume() {
  return (
    <iframe src="/resumes/resume2025.pdf" title="Resume PDF" className={styles.pdfIframe}></iframe>
  );
}
