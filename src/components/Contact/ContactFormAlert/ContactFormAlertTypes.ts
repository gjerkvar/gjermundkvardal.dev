export interface ContactFormAlertTypes {
    openErrorAlert: boolean;
    setOpenErrorAlert: (value: boolean) => void;
    openSuccessAlert: boolean;
    setOpenSuccessAlert: (value: boolean) => void;
    customMessage?: string;
}