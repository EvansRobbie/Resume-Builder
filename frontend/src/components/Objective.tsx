import { Form, Formik } from "formik";
import axios from "axios";
import FormikControl from "../forms/FormikControl";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./DeleteButton";
import { toast } from "react-hot-toast";

const Objective = () => {
  const { subpages } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    objective: "",
  });
  const [isEditing, setIsEdit] = useState(false);

  useEffect(() => {
    if (subpages === "objective") {
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/objective");
          if (data) {
            setInitialValues(data);
            setIsEdit(true);
          }
        } catch (e) {
          console.log("Failed to fetch Objrctive details", e);
          toast.error("Failed to fetch Objrctive details");
        }
      };
      fetchData();
    }
  }, [subpages]);
  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      if (isEditing) {
        await axios.put("/objective", values);
        toast.success(" Details Updated Successfully");
      } else {
        await axios.post("/objective", values);
        toast.success("Details Saved Successfully");
        onSubmitProps.resetForm();
        navigate("/create-resume");
      }
    } catch (e) {
      console.log("Failed To Submit Details", e);
      toast.error("Failed To Submit Details");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/objective");
      toast.success("Details Deleted Succesfully");
      navigate("/create-resume");
    } catch (e) {
      console.log("Failed to delete Objective Details");
      toast.error("Failed to Delete details");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      <Form className="shadow-md group shadow-slate-950 px-4 py-6 rounded-2xl relative ">
        <FormikControl
          control="textarea"
          name="objective"
          label="Objective"
          placeholder="Results-driven and highly motivated Full Stack Junior developer....."
        />

        <div className="button">
          <button
            className="text-slate-200 font-blod uppercase text-sm "
            type="submit"
          >
            {isEditing ? "update" : "save"}
          </button>
        </div>
        {isEditing && <Button handleDelete={handleDelete} />}
      </Form>
    </Formik>
  );
};

export default Objective;
