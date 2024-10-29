import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../../../firebaseConfig";
import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [projects, setProjects] = useState<any[]>([]); // List of projects

  // Fetch projects on load
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
  }, []);

  // Handle project submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "projects"), {
        title,
        description,
        githubLink,
        liveLink,
        imageUrl,
      });

      // Reset form and update projects
      setTitle("");
      setDescription("");
      setGithubLink("");
      setLiveLink("");
      setImage(null);
      setProjects([...projects, { title, description, githubLink, liveLink, imageUrl }]);
    }
  };

  // Handle project deletion
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "projects", id));
    setProjects(projects.filter((project) => project.id !== id));
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="project-form">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="url" placeholder="GitHub Link" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
        <input type="url" placeholder="Live Link" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} required />
        <button type="submit">Add Project</button>
      </form>

      <h3>Existing Projects</h3>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <img src={project.imageUrl} alt={project.title} className="project-thumbnail" />
            <div>
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <button onClick={() => handleDelete(project.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default AdminDashboard;
