import { useState, useEffect } from "react";
import axios from "axios";
import FormikControl from "../forms/FormikControl";
import { Form, Formik, FieldArray } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import RemoveButton from "./RemoveButton";
import Button from "./DeleteButton";
import { toast } from "react-hot-toast";

const Education = () => {
  const { subpages } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    education: [
      {
        course: "",
        school: "",
        grade: "",
        year: "",
      },
    ],
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (subpages === "education") {
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/education");
          if (data) {
            const updatedInitialValues = { education: data.education };
            setInitialValues(updatedInitialValues);
            setIsEdit(true);
          }
          // console.log(data)
        } catch (e) {
          console.log("Failed to fetch Education details", e);
          toast.error("Failed to fetch Education details");
        }
      };
      fetchData();
    }
  }, [subpages]);
  // console.log(initialValues)
  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      if (isEdit) {
        await axios.put("/education", { education: values.education });
        toast.success(" Details Updated Successfully");
      } else {
        await axios.post("/education", { education: values.education });
        toast.success("Details Saved Successfully");
        onSubmitProps.resetForm();
      }
      navigate("/create-resume/education");
    } catch (e) {
      console.log(e);
      toast.error("Failed To Submit Details");
    }
  };
  const handleDelete = async (formik: any, index: any) => {
    try {
      const educationToDelete = formik.values.education[index];
      await axios.delete(`/education/${educationToDelete._id}`);
      // Remove the education from the formik values
      formik.setFieldValue(`education.${index}`, undefined);
      toast.success("Details Deleted Succesfully");
      navigate("/create-resume/education");
    } catch (e) {
      console.log("Failed to delete education Details");
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
        <Form className="w-full flex flex-col gap-6">
          <FieldArray name="education">
            {({ push, remove }) => (
              <div>
                {formik.values.education.map((_, index) => (
                  <div
                    key={index}
                    className="my-10 relative group shadow-md overflow-hidden  shadow-slate-900 px-4 rounded-2xl py-5"
                  >
                    <FormikControl
                      control="input"
                      name={`education[${index}].course`}
                      label="Course/Degree"
                      placeholder="Bsc Infomation Technology"
                    />
                    <div className="grid grid-cols-2 w-full gap-4">
                      <FormikControl
                        control="input"
                        name={`education[${index}].school`}
                        label="School/University"
                        placeholder="University of ..."
                      />

                      <FormikControl
                        control="input"
                        name={`education[${index}].grade`}
                        label="Grade/Score"
                        placeholder="University of ..."
                      />
                    </div>
                    <FormikControl
                      control="input"
                      name={`education[${index}].year`}
                      label="Year"
                      placeholder="2011 - 2015"
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

export default Education;
