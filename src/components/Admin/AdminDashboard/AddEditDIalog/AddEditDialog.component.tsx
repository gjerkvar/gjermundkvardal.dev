import {
  AddEditDialogModeEnum,
  AddEditDialogProps,
} from "./AddEditDialogProps";
import "./AddEditDialog.css";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebaseConfig";
import "../../../../styles/GlobalDialog.css";

const AddEditDialog = (props: AddEditDialogProps) => {
  const [title, setTitle] = useState<string>(props.selectedProject?.title || "");
  const [description, setDescription] = useState<string>(props.selectedProject?.description || "");
  const [whatILearned, setWhatILearned] = useState<string>(props.selectedProject?.whatILearned || "");
  const [githubLink, setGithubLink] = useState<string>(props.selectedProject?.githubLink || "");
  const [liveLink, setLiveLink] = useState<string>(props.selectedProject?.liveLink || "");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    // Update form fields when selectedProject changes
    if (props.selectedProject) {
      setTitle(props.selectedProject.title || "");
      setDescription(props.selectedProject.description || "");
      setWhatILearned(props.selectedProject.whatILearned || "");
      setGithubLink(props.selectedProject.githubLink || "");
      setLiveLink(props.selectedProject.liveLink || "");
    }
  }, [props.selectedProject]);

  useEffect(() => {
    // Cleanup function for the preview URL
    return () => {
      if (image) {
        URL.revokeObjectURL(URL.createObjectURL(image));
      }
    };
  }, [image]);

  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = 'auto'; // Enable scroll
    }

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [props.isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = props.selectedProject?.imageUrl;

      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const projectData = {
        title,
        description,
        whatILearned,
        githubLink,
        liveLink,
        imageUrl,
      };

      if (props.mode === AddEditDialogModeEnum.Add) {
        const docRef = await addDoc(collection(db, "projects"), projectData);
        props.setProjects([...props.projects, { ...projectData, id: docRef.id, imageUrl: projectData.imageUrl || "" }]);
      } else {
        // Update existing project
        await updateDoc(doc(db, "projects", props.selectedProject!.id), projectData);
        props.setProjects(
          props.projects.map((p) =>
            p.id === props.selectedProject?.id ? { ...projectData, id: p.id, imageUrl: projectData.imageUrl || "" } : p
          )
        );
      }

      handleCancel();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleCancel = () => {
    props.setIsOpen(false);
    props.setMode(AddEditDialogModeEnum.None);
    props.setSelectedProject(null);
    // Reset form
    setTitle("");
    setDescription("");
    setWhatILearned("");
    setGithubLink("");
    setLiveLink("");
    setImage(null);
  };

  return (
    <div className={`dialog-overlay ${props.isOpen ? "open" : ""}`}>
      <div className="portfolio-dialog-content">
        <h1>
          {props.mode === AddEditDialogModeEnum.Add
            ? "Create Project"
            : "Edit project"}
        </h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <textarea
              placeholder="What I learned"
              value={whatILearned}
              onChange={(e) => setWhatILearned(e.target.value)}
            />
            <input
              type="url"
              placeholder="GitHub Link"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
            <input
              type="url"
              placeholder="Live Link"
              value={liveLink}
              onChange={(e) => setLiveLink(e.target.value)}
            />
            {/* Image Preview Section */}
            <div className="image-preview-container">
              {image ? (
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Selected preview" 
                  className="image-preview"
                />
              ) : props.mode === AddEditDialogModeEnum.Update && props.selectedProject?.imageUrl ? (
                <img 
                  src={props.selectedProject.imageUrl} 
                  alt="Current project" 
                  className="image-preview"
                />
              ) : (
                <div className="image-preview-placeholder">
                  No image selected
                </div>
              )}
            </div>
            <input
              type="file"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              required={props.mode === AddEditDialogModeEnum.Add}
              accept="image/*"
            />
         
        
        <div className="portfolio-dialog-footer">
          <button onClick={() => handleCancel()} className="cancel-button">
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
        </form>
        </div>

      </div>
    </div>
  );
};

export default AddEditDialog;