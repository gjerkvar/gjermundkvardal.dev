import { ContactFormAlertTypes } from "./ContactFormAlertTypes";
import "./ContactFormAlert.css"
import { useEffect } from "react";

export const ContactFormAlert = (props: ContactFormAlertTypes) => {

    // Close alert after 10 seconds
    useEffect(() => {
        if(props.openErrorAlert || props.openSuccessAlert) {
            const interval = setInterval(() => {
                props.setOpenErrorAlert(false);
                props.setOpenSuccessAlert(false);
            },10000)

            return() => clearInterval(interval);
        }
    },[props.openErrorAlert, props.openSuccessAlert])

  return (
    <div>
      {props.openSuccessAlert && (
        <div className="contact-form-success-alert">
            { props.customMessage ?? "Message is sent!"}
          <span
            className="contact-form-alert-close-button"
            onClick={() => props.setOpenSuccessAlert(false)}
          >
            X
          </span>
        </div>
      )}
      {props.openErrorAlert && (
        <div className="contact-form-error-alert">
            { props.customMessage ?? "Error sending message! Please try again!"}
          <span
            className="contact-form-alert-close-button"
            onClick={() => props.setOpenErrorAlert(false)}
          >
            X
          </span>
        </div>
      )}
    </div>
  );
};
