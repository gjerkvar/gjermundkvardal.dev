import "./About.css";

const About = () => {

    return(
        <section className="about">
            <div className="about-container">
                <div className="about-text">
                    <h2>About me</h2>
                    <p>
                        Hi, I'm Gjermund Kvardal, a passionate frontend developer with a love for creating clean and modern web experiences.
                        I enjoy building responsive and user-friendly websites with technologioes like React, JavaScript and CSS.
                    </p>
                    <p>
                        Here are a few skills I've picked up along the way:
                    </p>
                    <ul className="skills-list">
                        <li>ReactJS</li>
                        <li>JavaScript</li>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>Typescript</li>
                    </ul>
                </div>
                <div className="about-image">
                    <img alt="Gjermund Kvardal"/>
                </div>
            </div>
        </section>
    )
}

export default About;