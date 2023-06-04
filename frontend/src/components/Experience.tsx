import { useState, useEffect } from "react";
import axios from "axios";
import FormikControl from "../forms/FormikControl";
import { Form, Formik, FieldArray } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./DeleteButton";
import RemoveButton from "./RemoveButton";
import { toast } from "react-hot-toast";

const Experience = () => {
  const { subpages } = useParams();
  const navigate = useNavigate();
  // console.log(subpages)
  const [initialValues, setInitialValues] = useState({
    experiences: [
      {
        companyName: "",
        jobTitle: "",
        start: "",
        end: "",
        details: "",
      },
    ],
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (subpages === "experience") {
      // setIsEdit(true)
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/experience");
          if (data) {
            const updatedInitialValues = { experiences: data.experiences };
            setInitialValues(updatedInitialValues);
            setIsEdit(true);
          }
          // console.log(data)
        } catch (e) {
          console.log("Failed to fetch Experience details", e);
          toast.error("Failed to fetch Experience details");
        }
      };
      fetchData();
    }
  }, [subpages]);
  // console.log(initialValues)
  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      if (isEdit) {
        await axios.put("/experience", { experiences: values.experiences });
        toast.success(" Details Updated Successfully");
      } else {
        toast.success("Details Saved Successfully");
        await axios.post("/experience", { experiences: values.experiences });
        onSubmitProps.resetForm();
      }
      navigate("/create-resume/experience");
    } catch (e) {
      console.log("Failed To Submit Details", e);
      toast.error("Failed To Submit Details");
    }
  };
  const handleDelete = async (formik: any, index: any) => {
    try {
      const experienceToDelete = formik.values.experiences[index];
      await axios.delete(`/experience/${experienceToDelete._id}`);
      // Remove the experience from the formik values
      formik.setFieldValue(`experiences.${index}`, undefined);
      toast.success("Details Deleted Succesfully");
      navigate("/create-resume/experience");
    } catch (e) {
      console.log("Failed to delete experience Details");
      toast.error("Failed to Delete details");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      className="py-4"
    >
      {(formik) => (
        <Form className="w-full flex flex-col gap-6 relative">
          {/* <div className='grid grid-cols-2 w-full gap-4'> */}
          <FieldArray name="experiences">
            {({ push, remove }) => (
              <div className="">
                {formik.values.experiences.map((_, index) => (
                  <div
                    key={index}
                    className="my-10 relative shadow-md group  overflow-hidden  shadow-slate-900 px-4 rounded-2xl py-5"
                  >
                    <FormikControl
                      control="input"
                      name={`experiences.[${index}].companyName`}
                      label="Company Name"
                      placeholder="Google"
                    />
                    <FormikControl
                      control="input"
                      name={`experiences.[${index}].jobTitle`}
                      label="Job Title"
                      placeholder="Software Developer"
                    />

                    {/* </div> */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormikControl
                        control="input"
                        name={`experiences.[${index}].start`}
                        label="Start Date"
                        placeholder="March - 2023"
                      />
                      <FormikControl
                        control="input"
                        name={`experiences.[${index}].end`}
                        label="End Date"
                        placeholder="upto Date/ Present"
                      />
                    </div>
                    <FormikControl
                      control="textarea"
                      name={`experiences.[${index}].details`}
                      label="Details"
                      placeholder="collaborated with team to members to write clean and efficient code ..."
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

export default Experience;
