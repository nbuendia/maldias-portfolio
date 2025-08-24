import { useEffect, useState } from "react";
import { PROJECT_ASCII } from "@/lib/constants";

import { Icon } from "@/components/Icon";

import styles from "./Projects.module.css";
import projectsList from "@/lib/data/projects.json";

interface ProjectsList {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  image: string;
  status: string;
  url: string;
  github: string;
  tags: string[];
}

interface ProjectStatus {
  "not-started": string;
  wip: string;
  completed: string;
}

export default function Projects() {
  const [showProjectsAscii, setShowProjectsAscii] = useState(false);
  const [startProjectAnimation, setStartProjectAnimation] = useState(false);
  const [projects, setProjects] = useState<ProjectsList[]>([]);
  const [showProjectsSection, setShowProjectsSection] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [currentlProjectIndex, setCurrentlProjectIndex] = useState(-1);

  useEffect(() => {
    const projectsTimeout = setTimeout(() => {
      setStartProjectAnimation(true);
    }, 1000);

    return () => clearTimeout(projectsTimeout);
  }, []);

  useEffect(() => {
    if (projectsList) setProjects(projectsList);
  }, [projects]);

  useEffect(() => {
    if (!showProjects) return;
    
    const delay = currentlProjectIndex < 0 ? 500 : 2000;
    const elem = document.getElementById("projects");
    
    elem?.scrollTo(0, elem?.scrollHeight);

    if (currentlProjectIndex < projects.length) {
      const currentlProjectIndexTimeout = setTimeout(() => {
        setCurrentlProjectIndex(currentlProjectIndex + 1);
      }, delay);

      return () => clearTimeout(currentlProjectIndexTimeout);
    }
  });

  const handleShowProjectAscii = () => {
    setShowProjectsAscii(true);

    const projectTimeout = setTimeout(() => {
      setShowProjectsSection(true);
    }, 2000);

    return () => clearTimeout(projectTimeout);
  };

  const handleShowProjects = () => {
    setShowProjects(true);
  }

  function handleProjectStatus(status: keyof ProjectStatus) {
    const statusColor = {
      "not-started": "gray",
      wip: "yellow",
      completed: "lime",
    } as ProjectStatus;

    return statusColor[status];
  }

  return (
    <div id="projects" className={styles.container}>
      {startProjectAnimation && (
        <>
          <pre className={styles.command} onAnimationEnd={handleShowProjectAscii}>
            $ cat projects.txt
          </pre>
          {showProjectsAscii && <pre className={styles.art}>{PROJECT_ASCII}</pre>}
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
              {projects.slice(0, currentlProjectIndex + 1).map((project, idx) => (
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
