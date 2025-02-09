
export interface Technology {
    id: string;
    name: string;
    category: TechnologyCategory;
    url: string;
    description?: string;
    logoUrl?: string;
}

export interface TechnologyAddEditDialogProps {
    isTechnologyDialogOpen: boolean;
    setIsTechnologyDialogOpen: (isOpen: boolean) => void;
    technologyDialogMode: TechnologyAddEditDialogModeEnum;
    setTechnologyDialogMode: (mode: TechnologyAddEditDialogModeEnum) => void;
    selectedTechnology: Technology | null;
    setSelectedTechnology: (technology: Technology | null) => void;
    technologies: Technology[];
    setTechnologies: (technologies: Technology[]) => void;
}

export enum TechnologyAddEditDialogModeEnum {
    None = 'None',
    Add = 'Add',
    Update = 'Update'
}

export enum TechnologyCategory {
    None = 'None',
    Frontend = 'Frontend',
    Backend = 'Backend',
    Tools = 'Tools'
}