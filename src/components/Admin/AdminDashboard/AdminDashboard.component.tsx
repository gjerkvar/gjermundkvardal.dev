import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../../../firebaseConfig";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AdminDashboard.css";

import { FaArrowLeft } from "react-icons/fa";
import { ProjectAddEditDialogModeEnum } from "./Project/ProjectAddEditDialogProps";
import ProjectAddEditDialog from "./Project/ProjectAddEditDialog.component";
import { handleProjectAdd, handleProjectDelete, handleProjectEdit } from "./Project/ProjectAddEditDialog.helper";
import { handleTechnologyAdd, handleTechnologyDelete, handleTechnologyEdit } from "./Technology/TechnologyAddEditDialog.helper";
import { TechnologyAddEditDialogModeEnum } from "./Technology/TechnologyAddEditDialogProps.types";
import { TechnologyAddEditDialog } from "./Technology/TechnologyAddEditDialog.component";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [openProjectDialog, setOpenProjectDialog] = useState<boolean>(false);
  const [projectDialogMode, setProjectDialogMode] = useState<ProjectAddEditDialogModeEnum>(ProjectAddEditDialogModeEnum.None);

  const [technologies, setTechnologies] = useState<any[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<any>(null);
  const [openTechnologyDialog, setOpenTechnologyDialog] = useState<boolean>(false);
  const [technologyDialogMode, setTechnologyDialogMode] = useState<TechnologyAddEditDialogModeEnum>(TechnologyAddEditDialogModeEnum.None);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    };
    fetchProjects();
  }, [openProjectDialog]);

  useEffect(() => {
    const fetchTecnologies = async () => {
      const querySnapshot = await getDocs(collection(db, "technologies"));
      const technologiesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTechnologies(technologiesData);
    };
    fetchTecnologies();
  },[openTechnologyDialog])

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleBack = () => {
    navigate("/"); // Navigate back to homepage
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleBack} className="admin-back-button"> <FaArrowLeft /> Back</button>

      <h3>Existing Projects</h3>
      <button onClick={() => handleProjectAdd(setSelectedProject, setProjectDialogMode, setOpenProjectDialog)}>Add +</button>
      
      {openProjectDialog && (
        <ProjectAddEditDialog 
          isProjectDialogOpen={openProjectDialog} 
          setIsProjectDialogOpen={setOpenProjectDialog} 
          mode={projectDialogMode} 
          setMode={setProjectDialogMode} 
          projects={projects} 
          setProjects={setProjects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      )}

      <ul className="project-list">
        {projects.map((project) => (
          <div key={project.id}>
            <li className="project-item">
              <img src={project.imageUrl} alt={project.title} className="project-thumbnail" />
              <div>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <button onClick={() => handleProjectEdit(project, setSelectedProject, setProjectDialogMode, setOpenProjectDialog)} className="portfolio-button">
                  Edit
                </button>
                <button onClick={() => handleProjectDelete(project.id, setProjects, projects)} className="portfolio-button">
                  Delete
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>


      <h3>Existing Technologies</h3>

      <button onClick={() => handleTechnologyAdd(setSelectedTechnology, setTechnologyDialogMode, setOpenTechnologyDialog)}>Add +</button>
      
      {openTechnologyDialog && (
        <TechnologyAddEditDialog 
          isTechnologyDialogOpen={openTechnologyDialog} 
          setIsTechnologyDialogOpen={setOpenTechnologyDialog} 
          technologyDialogMode={technologyDialogMode} 
          setTechnologyDialogMode={setTechnologyDialogMode} 
          technologies={technologies} 
          setTechnologies={setTechnologies}
          selectedTechnology={selectedTechnology}
          setSelectedTechnology={setSelectedTechnology}
        />
      )}

      <ul className="project-list">
        {technologies.map((technology) => (
          <div key={technology.id}>
            <li className="project-item">
              <img src={technology.logoUrl} alt={technology.title} className="project-thumbnail" />
              <div>
                <h4>{technology.name}</h4>
                <button onClick={() => handleTechnologyEdit(technology, setSelectedTechnology, setTechnologyDialogMode, setOpenTechnologyDialog)} className="portfolio-button">
                  Edit
                </button>
                <button onClick={() => handleTechnologyDelete(technology.id, setTechnologies, technologies)} className="portfolio-button">
                  Delete
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>

      <button onClick={handleLogout} className="portfolio-button">Logout</button>
    </div>
  );
};

export default AdminDashboard;
