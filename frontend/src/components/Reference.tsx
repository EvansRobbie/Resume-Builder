import { useState, useEffect } from "react";
import { Form, Formik, FieldArray } from "formik";
import axios from "axios";
import FormikControl from "../forms/FormikControl";
import { useNavigate, useParams } from "react-router-dom";
import RemoveButton from "./RemoveButton";
import Button from "./DeleteButton";
import { toast } from "react-hot-toast";

const Reference = () => {
  const { subpages } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    referees: [
      {
        name: "",
        title: "",
        companyName: "",
        email: "",
        phone: "",
      },
    ],
  });
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    if (subpages === "reference") {
      // setIsEdit(true)
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/referee");
          if (data) {
            const updatedInitialValues = { referees: data.referees };
            setInitialValues(updatedInitialValues);
            setIsEdit(true);
          }
          // console.log(data)
        } catch (e) {
          console.log("Failed to fetch Referee details", e);
          toast.error("Failed to fetch Referee details");
        }
      };
      fetchData();
    }
  }, [subpages]);
  const onSubmit = async (values: any, onSubmitProps: any) => {
    // console.log(values)
    try {
      if (isEdit) {
        await axios.put("/reference", { referees: values.referees });
        toast.success(" Details Updated Successfully");
      } else {
        await axios.post("/reference", { referees: values.referees });
        toast.success("Details Saved Successfully");
        onSubmitProps.resetForm();
      }
      navigate("/create-resume");
    } catch (e) {
      console.log("Failed To Submit Details", e);
      toast.error("Failed To Submit Details");
    }
  };

  const handleDelete = async (formik: any, index: any) => {
    try {
      const refereesToDelete = formik.values.referees[index];
      await axios.delete(`/reference/${refereesToDelete._id}`);
      // Remove the referees from the formik values
      formik.setFieldValue(`referees.${index}`, undefined);
      toast.success("Details Deleted Succesfully");
      navigate("/create-resume/reference");
    } catch (e) {
      console.log("Failed to delete referees Details");
      toast.error("Failed to Delete details");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      className=""
    >
      {(formik) => (
        <Form className="w-full flex flex-col gap-6">
          <FieldArray name="referees">
            {({ push, remove }) => (
              <div className="">
                {formik.values.referees.map((_, index) => (
                  <div
                    key={index}
                    className="my-10 relative shadow-md overflow-hidden group  shadow-slate-900 px-4 rounded-2xl py-5"
                  >
                    <FormikControl
                      control="input"
                      name={`referees[${index}].name`}
                      label="Referee Name"
                      placeholder="John Doe"
                    />
                    <FormikControl
                      control="input"
                      name={`referees[${index}].title`}
                      label="Job Title"
                      placeholder="Senior Software Developer"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormikControl
                        control="input"
                        name={`referees[${index}].companyName`}
                        label="Company&nbsp;Name"
                        placeholder="Google"
                      />
                      <FormikControl
                        control="input"
                        name={`referees[${index}].email`}
                        label="Email"
                        placeholder="johndoe@gmail.com"
                      />
                    </div>
                    <FormikControl
                      control="input"
                      name={`referees[${index}].phone`}
                      label="Phone"
                      placeholder="+254700000000"
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

export default Reference;
