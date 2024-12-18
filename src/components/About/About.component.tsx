import "./About.css";
import image from "./me.jpg";

const About = () => {
    
    return(
        <section className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              Hi, I’m Gjermund Kvardal, a passionate web developer with a love for
              creating sleek, functional designs. I thrive on building responsive,
              user-friendly applications that combine beautiful design with intuitive
              functionality.
            </p>
            <p>
              When I’m not coding, you’ll find me exploring cars, watches, and the
              cosmos. I love blending technology with creativity and always strive to
              learn something new.
            </p>
          </div>
          <div className="about-image">
            <img
              src={image}
              alt="Gjermund Kvardal"
              className="profile-image"
            />
          </div>
        </div>
      </section>
      
    )
}

export default About;