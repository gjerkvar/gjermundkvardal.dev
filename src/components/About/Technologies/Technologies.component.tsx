import React, { useEffect, useState } from "react";
import "./Technologies.css";
import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Technology, TechnologyCategory } from "../../Admin/AdminDashboard/Technology/TechnologyAddEditDialogProps.types";

export const Technologies = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [frontendTechnologies, setFrontendTechnologies] = useState<Technology[]>([]);
  const [backendTechnologies, setBackendTechnologies] = useState<Technology[]>([]);
  const [toolsTechnologies, setToolsTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    const fetchTecnologies = async () => {
      const querySnapshot = await getDocs(collection(db, "technologies"));
      const technologiesData: Technology[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || "", 
          category: data.category || TechnologyCategory.None, 
          url: data.url || "",
          description: data.description || "",
          logoUrl: data.logoUrl || "",
        };
      });
      setTechnologies(technologiesData);
    };
    fetchTecnologies();
  },[])

  useEffect(() => {
    console.log("Technologies:", technologies);
  },[technologies])

  useEffect(() => {
    if (technologies) {
      setFrontendTechnologies(technologies.filter(tech => tech.category === "Frontend"));
      setBackendTechnologies(technologies.filter(tech => tech.category === "Backend"));
      setToolsTechnologies(technologies.filter(tech => tech.category === "Tools"));
    }
  }, [technologies]);

  return (
    <div className="technologies">
      <h2>Technologies</h2>

      <div className="tech-category-section">
        <h3 className="tech-category-header">Frontend</h3>
        <div className="tech-grid">
          {frontendTechnologies.map((tech:any, idx:any) => (
            <a
              key={idx}
              href={tech.url}
              className="tech-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={tech.logoUrl}
                alt={`${tech.name} logo`}
                className="tech-logo"
              />
              <div className="tech-info">
                <span className="tech-name">{tech.name}</span>
  
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="tech-category-section">
        <h3 className="tech-category-header">Backend</h3>
        <div className="tech-grid">
          {backendTechnologies.map((tech:any, idx:any) => (
            <a
              key={idx}
              href={tech.url}
              className="tech-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={tech.logoUrl}
                alt={`${tech.name} logo`}
                className="tech-logo"
              />
              <div className="tech-info">
                <span className="tech-name">{tech.name}</span>
  
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="tech-category-section">
        <h3 className="tech-category-header">Tools</h3>
        <div className="tech-grid">
          {toolsTechnologies.map((tech:any, idx:any) => (
            <a
              key={idx}
              href={tech.url}
              className="tech-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={tech.logoUrl}
                alt={`${tech.name} logo`}
                className="tech-logo"
              />
              <div className="tech-info">
                <span className="tech-name">{tech.name}</span>
  
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
