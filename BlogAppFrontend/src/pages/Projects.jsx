import React from "react";
import CallToAction from "../Components/CallToAction";

function Projects() {
  return (
    <>
      <div className="min-h-screen max-w-5xl mx-auto flex flex-col justify-center items-center gap-6 p-3">
        <h1 className="text-4xl font-semibold ">Projects</h1>
        <p className="text-lg text-gray-500 ">
          All my projects are in my github repository . Feel free to contribute
        </p>
        <CallToAction />
      </div>
    </>
  );
}

export default Projects;
