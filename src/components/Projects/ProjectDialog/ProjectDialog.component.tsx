import React, { useEffect } from "react";
import "./ProjectDialog.css";

type ProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  project: {
    name: string;
    description: string;
    imageUrl: string;
    githubLink: string;
    liveLink: string;
  };
};

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  // Use useEffect to disable page scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when closed
      document.body.style.overflow = "auto";
    }

    // Clean up when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const githubLogo = ""; // Placeholder for GitHub logo
  const liveLogo = "";   // Placeholder for Live logo

  return (
    <div className={`dialog-overlay ${isOpen ? 'open' : ''}`}>
      <div className="dialog-content">
        {/* Display image or placeholder */}
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.name} className="project-image" />
        ) : (
          <div className="project-image-placeholder">No Image Available</div>
        )}

        <div className="text-container">
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>

        <div className="link-buttons">
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub" className="link-logo" />
            View GitHub Repo
          </a>
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            <img src={liveLogo} alt="Live Project" className="link-logo" />
            Visit Project
          </a>
        </div>

        <button className="close-button" onClick={onClose}>Back</button>
      </div>
    </div>
  );
};

export default ProjectDialog;
