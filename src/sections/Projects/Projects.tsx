import { useEffect, useRef, useState } from "react";
import { ProjectStatus } from "@/features/Projects";
import { PROJECT_ASCII } from "@/lib/constants";
import { useAsciiScroll, useProjects, useProjectsAscii } from "@/hooks";

import { Icon } from "@/components/Icon";

import styles from "./Projects.module.css";

export default function Projects() {
  const projectContainerRef = useRef<HTMLDivElement>(null);
  const { startProjectAnimation, showProjectsAscii, showProjectsSection, handleProjectsAsciiReset, handleShowProjectAscii } = useProjectsAscii();
  const { showProjects, projects, currentProjectIndex, handleProjectsStateReset, handleShowProjects, handleProjectStatus } = useProjects();
  
  const [startArtAnim, setStartArtAnim] = useState(false);

  useAsciiScroll(projectContainerRef, setStartArtAnim);

  useEffect(() => {
    return () => {
      handleProjectsAsciiReset();
      handleProjectsStateReset();
    }
  }, [handleProjectsAsciiReset, handleProjectsStateReset]);

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const elemPaddingCss = window.getComputedStyle(entry.target).padding;
      const elemPaddingNum = parseFloat(elemPaddingCss);
      const artElem = entry.target.children.namedItem("art");

      if (artElem) {
        const isScrollable = artElem.clientWidth <= artElem.scrollWidth - elemPaddingNum;
        
        if (isScrollable) setStartArtAnim(true);
        else setStartArtAnim(false);
      }
    }
  });

  return (
    <div id="projects" ref={projectContainerRef} className={styles.container}>
      {startProjectAnimation && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowProjectAscii}>
            $ cat projects.txt
          </pre>
          {showProjectsAscii && <pre id="art" className={`${styles.art} ${startArtAnim && styles.artAnim}`}>{PROJECT_ASCII}</pre>}
        </>
      )}

      <br />

      {showProjectsSection && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowProjects}>
            $ cat project-list.txt
          </pre>

          {showProjects && (
            <>
              {projects.slice(0, currentProjectIndex + 1).map((project, idx) => (
                <div key={idx} className={styles.projectsContainer}>
                  <Icon name="image" size="75px" />

                  <div className={styles.projectDescriptionContainer}>
                    <span className={styles.projectTitle}>
                      {project.name}
                      <Icon name="target" size="6px" color={handleProjectStatus(project.status as keyof ProjectStatus)}
                        className={styles.iconAnim} />
                    </span>
                    
                    <span className={styles.projectDescription}>
                      {project.description}
                    </span>
                    
                    <div className={styles.projectLinkContainer}>
                      {project.github && (
                        <span className={styles.projectLink} style={{gap: "20px"}}>
                          GitHub:
                          <a href={project.github} target="_blank">
                            {project.github}
                          </a>
                        </span>
                      )}
                      
                      {project.url && (
                        <span className={styles.projectLink} style={{gap: "40px"}}>
                          Live:
                          <a href={project.url} target="_blank">
                            {project.url}
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  )
}
