import { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import axios from "axios";
import FormikControl from "../forms/FormikControl";
import { useNavigate, useParams } from "react-router-dom";
import RemoveButton from "./RemoveButton";
import Button from "./DeleteButton";
import { toast } from "react-hot-toast";

const Projects = () => {
  const { subpages } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    project: [
      {
        title: "",
        description: "",
      },
    ],
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (subpages === "projects") {
      // setIsEdit(true)
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/projects");
          if (data) {
            const updatedInitialValues = { project: data.project };
            setInitialValues(updatedInitialValues);
            setIsEdit(true);
          }
          // console.log(data)
        } catch (e) {
          console.log("Failed to fetch Projects details", e);
          toast.error("Failed to fetch projects details");
        }
      };
      fetchData();
    }
  }, [subpages]);
  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      if (isEdit) {
        await axios.put("/projects", { project: values.project });
        toast.success(" Details Updated Successfully");
      } else {
        await axios.post("/projects", { project: values.project });
        toast.success("Details Saved Successfully");
        onSubmitProps.resetForm();
      }
    } catch (e) {
      console.log("Failed To Submit Details", e);
      toast.error("Failed To Submit Details");
    }
    navigate("/create-resume");
  };
  const handleDelete = async (formik: any, index: any) => {
    try {
      const projectToDelete = formik.values.project[index];
      await axios.delete(`/project/${projectToDelete._id}`);
      // Remove the project from the formik values
      formik.setFieldValue(`project.${index}`, undefined);
      toast.success("Details Deleted Succesfully");
      navigate("/create-resume/projects");
    } catch (e) {
      console.log("Failed to delete project Details");
      toast.error("Failed to Delete details");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {(formik) => (
        <Form className="flex flex-col gap-4">
          <FieldArray name="project">
            {({ push, remove }) => (
              <div>
                {formik.values.project.map((_, index) => (
                  <div
                    key={index}
                    className="my-10 relative group shadow-md overflow-hidden  shadow-slate-900 px-4 rounded-2xl py-5"
                  >
                    <FormikControl
                      control="input"
                      name={`project.[${index}].title`}
                      label="Title"
                      placeholder=" React Resume Builder"
                    />
                    <FormikControl
                      control="textarea"
                      name={`project.[${index}].description`}
                      label="Description"
                      placeholder="Developed a Resume Builder using Typescript, React, React Formik..."
                    />
                    {index > 0 && <RemoveButton remove={() => remove(index)} />}
                    {isEdit && index >= 0 && (
                      <Button
                        handleDelete={() => handleDelete(formik, index)}
                      />
                    )}
                  </div>
                ))}
                <button
                  className="bg-cyan-500 flex px-4 py-1 text-sm rounded-full my-3 gap-2 items-center hover:bg-slate-950 duration-500 ease-in text-slate-200"
                  type="button"
                  onClick={() => push({})}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  Add
                </button>
              </div>
            )}
          </FieldArray>

          <button
            className="text-slate-200 button font-blod uppercase text-sm disabled:bg-cyan-500/20 cursor-pointer disabled:text-slate-950"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            {isEdit ? "Update" : "Save"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Projects;
