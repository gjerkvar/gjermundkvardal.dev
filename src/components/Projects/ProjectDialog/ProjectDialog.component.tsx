import React, { useEffect } from "react";
import "./ProjectDialog.css";
import "../../../styles/GlobalDialog.css";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { ProjectDialogProps } from "./ProjectDialog.types";

const ProjectDialog: React.FC<ProjectDialogProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  
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

 return (
  <div className={`dialog-overlay ${isOpen ? "open" : ""}`}>
    <div className="dialog-content">
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="project-image"
        />
      ) : (
        <div className="project-image-placeholder">No Image Available</div>
      )}

      <div className="text-container">
        <div className="project-dialog-header">
          <h2 className="project-title">{project.title}</h2>
          <div className="project-links">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="link-logo" />
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink className="link-logo" />
            </a>
          </div>
        </div>
        <h3 className="section-heading">Description</h3>
        <p className="section-content">{project.description}</p>
        {project.whatILearned && (
          <>
            <h3 className="section-heading">What I Learned</h3>
            <p className="section-content">{project.whatILearned}</p>
          </>
        )}
      </div>
      <div>
      </div>
      <div className="portfolio-dialog-footer">
        <button className="close-button" onClick={onClose}>
          Back
        </button>
      </div>
    </div>
  </div>
);

};

export default ProjectDialog;