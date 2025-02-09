import { useState } from "react";
import { Technology, TechnologyAddEditDialogModeEnum, TechnologyAddEditDialogProps, TechnologyCategory } from "./TechnologyAddEditDialogProps.types";
import { db } from "../../../../firebaseConfig";
import { addDoc, doc, updateDoc } from "firebase/firestore";
import {  storage } from "../../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection } from "firebase/firestore";

export const TechnologyAddEditDialog = (props: TechnologyAddEditDialogProps) => {

    const [name, setName] = useState<any>(props.selectedTechnology?.name ?? "");
    const [description, setDescription] = useState<any>(props.selectedTechnology?.description ?? "");
    const [url, setUrl] = useState<string>(props.selectedTechnology?.url ?? "");
    const [category, setCategory] = useState<TechnologyCategory>(props.selectedTechnology?.category ?? TechnologyCategory.None);
    const [logo, setLogo] = useState<any>();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      try {
        let logoUrl = props.selectedTechnology?.logoUrl;
  
        if (logo) {
          const logoRef = ref(storage, `logos/${Date.now()}_${logo.name}`);
          await uploadBytes(logoRef, logo);
          logoUrl = await getDownloadURL(logoRef);
        }
  
        const technologyData = {
          name,
          category,
          url,
          description,
          logoUrl,
        };
  
        if (props.technologyDialogMode === TechnologyAddEditDialogModeEnum.Add) {
          const docRef = await addDoc(collection(db, "technologies"), technologyData);
          props.setTechnologies([...props.technologies, { ...technologyData, id: docRef.id, logoUrl: technologyData.logoUrl || "" }]);
        } else {
          // Update existing project
          await updateDoc(doc(db, "technologies", props.selectedTechnology!.id), technologyData);
          props.setTechnologies(
            props.technologies.map((p) =>
              p.id === props.selectedTechnology?.id ? { ...technologyData, id: p.id, logoUrl: technologyData.logoUrl || "" } : p
            )
          );
        }
  
        handleCancel();
      } catch (error) {
        console.error("Error saving technology:", error);
      }
    };
    
    const handleCancel = () => {
      props.setIsTechnologyDialogOpen(false);
      props.setTechnologyDialogMode(TechnologyAddEditDialogModeEnum.None);
      props.setSelectedTechnology(null);
      // Reset form
      setName("");
      setDescription("");
      setCategory(TechnologyCategory.None);
      setLogo(null);
    };

    return (
        <div className={`dialog-overlay ${props.isTechnologyDialogOpen ? "open" : ""}`}>
          <div className="portfolio-dialog-content">
            <h1>
              {props.technologyDialogMode === TechnologyAddEditDialogModeEnum.Add
                ? "Create Technology"
                : "Edit Technology"}
            </h1>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <select
                  aria-placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TechnologyCategory)}
                  required
                  >
                    <option value={TechnologyCategory.None}>None</option>
                    <option value={TechnologyCategory.Frontend}>Frontend</option>
                    <option value={TechnologyCategory.Backend}>Backend</option>
                    <option value={TechnologyCategory.Tools}>Tools</option>
                </select>
                {/* Image Preview Section */}
                <div className="image-preview-container">
                  {logo ? (
                    <img 
                      src={URL.createObjectURL(logo)} 
                      alt="Selected preview" 
                      className="image-preview"
                    />
                  ) : props.technologyDialogMode === TechnologyAddEditDialogModeEnum.Update && props.selectedTechnology?.logoUrl ? (
                    <img 
                      src={props.selectedTechnology.logoUrl} 
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
                    setLogo(e.target.files ? e.target.files[0] : null)
                  }
                  required={props.technologyDialogMode === TechnologyAddEditDialogModeEnum.Add}
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
}