import "./About.css";
import { Bio } from "./Bio/Bio.component";
import { Technologies } from "./Technologies/Technologies.component";

const About = () => {
    return (
        <section className="about-container">
            <div className="about-content">
                <div className="about-section">
                    <Bio />
                </div>
                <div className="technologies-section">
                    <Technologies />
                </div>
            </div>
        </section>
    );
};

export default About;