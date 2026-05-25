import { useEffect, useRef } from "react";
import { ProjectStatus } from "@/features/Projects";
import { PROJECT_ASCII } from "@/lib/constants";

import { useAsciiScroll } from "@/hooks";
import {
  useProjectsReset,
  useProjectsState,
  useProjects,
  useProjectsList,
} from "./hooks";

import { Icon } from "@/components/Icon";

import styles from "./Projects.module.css";

export default function Projects() {
  const projectContainerRef = useRef(null);

  const {handleProjectsStateReset} = useProjectsReset();
  const {projects, currentProjectIndex, startProjectAnimation, showProjectsAscii, showProjectsSection, showProjects, startAsciiScrollAnim} = useProjectsState();
  const {setStartAsciiScrollAnim, handleShowProjectAscii} = useProjects();
  const {handleShowProjects, handleProjectStatus} = useProjectsList();

  useAsciiScroll(projectContainerRef, setStartAsciiScrollAnim);

  useEffect(() => {
    return () => handleProjectsStateReset();
  }, [handleProjectsStateReset]);

  return (
    <div id="projects" ref={projectContainerRef} className={styles.container}>
      {startProjectAnimation && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowProjectAscii}>
            $ cat projects.txt
          </pre>
          {showProjectsAscii && <pre id="art" className={`${styles.art} ${startAsciiScrollAnim && "artAnim"}`}>{PROJECT_ASCII}</pre>}
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
