import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { TechnologyAddEditDialogModeEnum } from "./TechnologyAddEditDialogProps.types";

export const handleTechnologyDelete = async (
    id: string, 
    setTechnologies: (projects: any[]) => void, 
    tecnologies: any[]
  ) => {
    try {
      await deleteDoc(doc(db, "technologies", id)); // Use deleteDoc correctly
      setTechnologies(tecnologies.filter((technology) => technology.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting technology:", error);
    }
  };
  
  export const handleTechnologyEdit = (
    technology: any,
    setSelectedTechnology: (technology: any) => void,
    setTechnologyDialogMode: (mode: TechnologyAddEditDialogModeEnum) => void,
    setOpenTechnologyDialog: (open: boolean) => void
  ) => {
    setSelectedTechnology(technology);
    setTechnologyDialogMode(TechnologyAddEditDialogModeEnum.Update);
    setOpenTechnologyDialog(true);
  };
  
  export const handleTechnologyAdd = (
    setSelectedTechnology: (project: any) => void,
    setTechnologyDialogMode: (mode: TechnologyAddEditDialogModeEnum) => void,
    setOpenTechnologyDialog: (open: boolean) => void
  ) => {
    setSelectedTechnology(null);
    setTechnologyDialogMode(TechnologyAddEditDialogModeEnum.Add);
    setOpenTechnologyDialog(true);
  };
  