import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../../../firebaseConfig";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AdminDashboard.css";
import AddEditDialog from "./AddEditDIalog/AddEditDialog.component";
import { AddEditDialogModeEnum } from "./AddEditDIalog/AddEditDialogProps";
import { FaArrowLeft } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [dialogMode, setDialogMode] = useState<AddEditDialogModeEnum>(AddEditDialogModeEnum.None);

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
  }, [openEditDialog]);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setDialogMode(AddEditDialogModeEnum.Update);
    setOpenEditDialog(true);
  };

  const handleAdd = () => {
    setSelectedProject(null);
    setDialogMode(AddEditDialogModeEnum.Add);
    setOpenEditDialog(true);
  };

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
      <button onClick={handleAdd}>Add +</button>
      
      {openEditDialog && (
        <AddEditDialog 
          isOpen={openEditDialog} 
          setIsOpen={setOpenEditDialog} 
          mode={dialogMode} 
          setMode={setDialogMode} 
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
                <button onClick={() => handleEdit(project)} className="portfolio-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)} className="portfolio-button">
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
