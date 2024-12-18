export interface ProjectDialogProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
      title: string;
      description: string;
      whatILearned?: string;
      imageUrl: string;
      githubLink: string;
      liveLink: string;
    };
  };