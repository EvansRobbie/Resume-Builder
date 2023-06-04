import { Form, Formik } from "formik";
import { useState, useEffect } from "react";
import FormikControl from "../forms/FormikControl";
import axios from "axios";
import Loading from "../components/Loading";

const GenerateResume = () => {
  const [resume, setResume] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Load resume from local storage on initial render
  useEffect(() => {
    const savedResume = localStorage.getItem("resume");
    if (savedResume) {
      setResume(savedResume);
    }
  }, []);
  const initialValues = {
    prompt: "",
  };
  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/generate-resume", values);
      const { resume } = response.data;
      setResume(resume);
      setIsLoading(false);
      onSubmitProps.resetForm();
      // Save resume to local storage
      localStorage.setItem("resume", resume);
      // console.log('Resume saved to local storage');
    } catch (e) {
      console.log("Failed to generate resume:", e);
    }
  };
  // console.log(resume)
  return (
    <div className=" bg-gradient-to-bl from-transparent to-slate-950/30 w-full min-h-screen py-8 h-full">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="mt-20 px-10 py-6">
          <FormikControl
            control="textarea"
            name="prompt"
            label="Prompt"
            placeholder="Generate a react developer resume sample with 2+ years of experience. Tech Stack React.js, Tailwind and Node.js"
          />
          <div className=" button">
            <button
              className="text-slate-200 font-blod uppercase text-sm "
              type="submit"
            >
              Generate
            </button>
          </div>
        </Form>
        {/* <div></div> */}
        {/* Helloo */}
      </Formik>
      {isLoading ? (
        <div className="flex items-center h-screen justify-center w-full">
          {" "}
          <Loading />
        </div>
      ) : (
        resume && (
          <div
            className=" max-w-4xl mx-auto shadow-xl shadow-slate-950 px-6 py-4 rounded-2xl"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: resume || "" }}
          />
        )
      )}
      {/* {resume} */}
    </div>
  );
};

export default GenerateResume;
