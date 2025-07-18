import { TECH_STACK } from "@/lib/constants";

import { Box } from "@/components/Box";

import styles from "./AboutMe.module.css";

export default function AboutMe() {
  return (
    <div id="about" className={styles.container}>
      <Box column className={styles.subContainer}>
        <pre className={styles.art}>
            {`
   ('-.    .-. .-')                            .-') _          _   .-')       ('-.   
  ( OO ).-.\  ( OO )                          (  OO) )        ( '.( OO )_   _(  OO)  
  / . --. / ;-----.\\  .-'),-----.  ,--. ,--.  /     '._        ,--.   ,--.)(,------. 
  | \\-.  \\  | .-.  | ( OO'  .-.  ' |  | |  |  |'--...__)       |   \`.   |  |  .---' 
.-'-'  |  | | '-' /_)/   |  | |  | |  | | .-')'--.  .--'       |         |  |  |     
 \\| |_.'  | | .-. \`. \\_) |  |\\|  | |  |_|( OO )  |  |          |  |'.'|  | (|  '--.  
  |  .-.  | | |  \\  |  \\ |  | |  | |  | | \`-' /  |  |          |  |   |  |  |  .--'  
  |  | |  | | '--'  /   \`'  '-'  '('  '-'(_.-'   |  |          |  |   |  |  |  \`---. 
  \`--' \`--' \`------'      \`-----'   \`-----'      \`--'          \`--'   \`--'  \`------' 
            `}
        </pre>

        <pre className={styles.command}>$ whoami</pre>
        
        <pre className={styles.response}>&gt; 
          Frontend Engineer. Space Enthusiast. Pixel Pusher.
        </pre>
        
        <br/>
        
        <pre className={styles.command}>$ tech-stack</pre>
        {TECH_STACK.map((tech, key) => (
            <pre key={key} className={styles.response}>&gt; {tech}</pre>
        ))}
      </Box>
    </div>
  )
}
