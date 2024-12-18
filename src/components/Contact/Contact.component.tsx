import { useEffect, useState } from "react";
import "./Contact.css";
import emailjs from "emailjs-com";
import { ContactFormAlert } from "./ContactFormAlert/ContactFormAlert.component";


const Contact = () => {
 
    const [openErrorAlert, setOpenErrorAlert] = useState<boolean>(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);
    const [customMessage, setCustomMessage] = useState<string | undefined>();

    useEffect(() => {
        console.log(openErrorAlert, "error alert");
        console.log(openSuccessAlert, "success");
    },[openErrorAlert, openSuccessAlert])

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        honeypot: '', // Hidden field for honeypot
      });
    
      const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e:any) => {
        e.preventDefault();
    
        // Check honeypot field
        if (formData.honeypot) {
          setOpenErrorAlert(true);
          setCustomMessage("Spam detected! Message submission blocked.")
          return;
        }

        const emailParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
        };

        console.log(emailParams);
        try {
            emailjs.send("service_k4s6jxg", "template_ft9driw", emailParams, "GlE3-0uejgkKN8XYl");
            setCustomMessage("Thank you! Your message has been sent.")
            setOpenSuccessAlert(true);
        } catch(error) {
            setOpenErrorAlert(true);
            setCustomMessage(String(error));
        }
    
      };

    return(
        <div className="contact-container">
    <h2 className="contact-heading">Get in Touch</h2>
    <form className="contact-form" onSubmit={handleSubmit} onChange={handleInputChange}>
        <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
        />
        <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
        />
        <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            required
        ></textarea>

        {/* Honeypot Field */}
        <input
            type="text"
            name="honeypot"
            style={{ display: 'none' }} /* Hidden from view */
        />

        <button type="submit">Send Message</button>
    </form>
    {(openErrorAlert || openSuccessAlert) && <ContactFormAlert openErrorAlert={openErrorAlert} setOpenErrorAlert={setOpenErrorAlert} openSuccessAlert={openSuccessAlert} setOpenSuccessAlert={setOpenSuccessAlert} customMessage={customMessage} />}
</div>

    )
}
export default Contact;