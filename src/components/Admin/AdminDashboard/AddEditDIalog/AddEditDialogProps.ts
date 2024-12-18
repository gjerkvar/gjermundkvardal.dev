export interface Project {
    id: string;
    title: string;
    description: string;
    whatILearned?: string;
    imageUrl: string;
    githubLink: string;
    liveLink: string;
}

export interface AddEditDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    mode: AddEditDialogModeEnum;
    setMode: (mode: AddEditDialogModeEnum) => void;
    selectedProject: Project | null;
    setSelectedProject: (project: Project | null) => void;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
}

export enum AddEditDialogModeEnum {
    None = 'None',
    Add = 'Add',
    Update = 'Update'
}