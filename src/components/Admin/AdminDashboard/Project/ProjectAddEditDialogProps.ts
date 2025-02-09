export interface Project {
    id: string;
    title: string;
    description: string;
    whatILearned?: string;
    imageUrl: string;
    githubLink: string;
    liveLink: string;
}

export interface ProjectAddEditDialogProps {
    isProjectDialogOpen: boolean;
    setIsProjectDialogOpen: (isOpen: boolean) => void;
    mode: ProjectAddEditDialogModeEnum;
    setMode: (mode: ProjectAddEditDialogModeEnum) => void;
    selectedProject: Project | null;
    setSelectedProject: (project: Project | null) => void;
    projects: Project[];
    setProjects: (projects: Project[]) => void;
}

export enum ProjectAddEditDialogModeEnum {
    None = 'None',
    Add = 'Add',
    Update = 'Update'
}