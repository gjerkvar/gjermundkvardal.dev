import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig"; // Adjust path if needed
import { collection, getDocs } from "firebase/firestore";
import ProjectDialog from "./ProjectDialog/ProjectDialog.component";
import "./Projects.css";
import { ProjectTypes } from "./Project.types";

const Projects = () => {
    const [projects, setProjects] = useState<ProjectTypes[]>([]);
    const [selectedProject, setSelectedProject] = useState<ProjectTypes | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  
    // Fetch projects from Firestore
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "projects"));
          const fetchedProjects = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as ProjectTypes),
          }));
          console.log(fetchedProjects,'lol');
          setProjects(fetchedProjects);
        } catch (error) {
          console.error("Error fetching projects:", error);
        }
      };
  
      fetchProjects();
    }, []);
  
    const openDialog = (project: any) => {
      setSelectedProject(project);
      setIsDialogOpen(true);
    };
  
    const closeDialog = () => {
      setIsDialogOpen(false);
    };

    useEffect(() => {
      console.log("projects", projects)
    },[projects])
  
    return (
      <section className="projects-page">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              onClick={() => openDialog(project)}
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            >
              <h3 className="project-card-title">{project.title}</h3>
            </div>
          ))}
        </div>
  
        {selectedProject && (
          <ProjectDialog
            isOpen={isDialogOpen}
            onClose={closeDialog}
            project={selectedProject}
          />
        )}
      </section>
    );
  };
  
  export default Projects;
  