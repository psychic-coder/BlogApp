import React from "react";

function About() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-3 text-center ">
          <div>
            <h1 className="text-3xl font-semibold text-center my-7 ">About Rohit</h1>
            <div className="text-md text-gray-500 flex flex-col gap-6 ">
              <p>
                I'm an aspiring Full-Stack Web Developer 💻 with a passion for
                building innovative and user-friendly web applications.
                Currently, I'm focusing on mastering the MERN stack (MongoDB,
                Express, React, and Node.js) to sharpen my skills in both
                front-end and back-end development. As a college student 🎓, I'm
                constantly seeking opportunities to learn and grow. I'm
                dedicated to expanding my knowledge and staying up-to-date with
                the latest technologies and industry trends.
              </p>
              <h1 className="text-2xl text-white font-semibold text-center mt-2">My Skills :</h1>
              <p>
                Front-end: React, HTML, CSS, JavaScript, Bootstrap,Tailwind<br/>
                Back-end: Node.js, Express, MongoDB Languages: JavaScript, Java<br/>
                Tools: Git, GitHub, Visual Studio Code, Postman
              </p>
              <p>Feel free to explore my repositories and reach out if you have any questions or potential collaboration opportunities! I'm always eager to learn and grow. 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
