import styles from "./EllipsisLoader.module.css";

export default function EllipsisLoader() {
  return (
    <pre>
      {[". ", ". ", ". "].map((dot, key) => (
        <span key={key} className={styles.ellipsisAnimation} 
          style={{animationDelay: `${key * 0.2}s`}}>
          {dot}
        </span>
      ))}
    </pre>
  )
}
