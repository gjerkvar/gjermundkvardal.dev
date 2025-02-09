import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { ProjectAddEditDialogModeEnum } from "./ProjectAddEditDialogProps";

export const handleProjectDelete = async (
    id: string, 
    setProjects: (projects: any[]) => void, 
    projects: any[]
  ) => {
    try {
      await deleteDoc(doc(db, "projects", id)); // Use deleteDoc correctly
      setProjects(projects.filter((project) => project.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  
  export const handleProjectEdit = (
    project: any,
    setSelectedProject: (project: any) => void,
    setProjectDialogMode: (mode: ProjectAddEditDialogModeEnum) => void,
    setOpenProjectDialog: (open: boolean) => void
  ) => {
    setSelectedProject(project);
    setProjectDialogMode(ProjectAddEditDialogModeEnum.Update);
    setOpenProjectDialog(true);
  };
  
  export const handleProjectAdd = (
    setSelectedProject: (project: any) => void,
    setProjectDialogMode: (mode: ProjectAddEditDialogModeEnum) => void,
    setOpenProjectDialog: (open: boolean) => void
  ) => {
    setSelectedProject(null);
    setProjectDialogMode(ProjectAddEditDialogModeEnum.Add);
    setOpenProjectDialog(true);
  };
  