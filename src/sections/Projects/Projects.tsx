import { Box } from "@/components/Box";

import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <div id="projects" className={styles.container}>
      <Box className={styles.subContainer}>
        <pre className={styles.art}>
          {`
    ___    ___     ___        _    ___     ___    _____    ___   
   | _ \\  | _ \\   / _ \\    _ | |  | __|   / __|  |_   _|  / __|  
   |  _/  |   /  | (_) |  | || |  | _|   | (__     | |    \\__ \\  
  _|_|_   |_|_\\   \\___/   _\\__/   |___|   \\___|   _|_|_   |___/  
_| """ |_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""| 
\`"-0-0-'"\\\`-0-0-'"\\\`-0-0-'"\\\`-0-0-'"\\\`-0-0-'"\\\`-0-0-'"\\\`-0-0-'"\\\`-0-0-'  
          `}
        </pre>
      </Box>
    </div>
  )
}
