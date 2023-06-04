import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import axios from "axios";
import FormikControl from "../forms/FormikControl";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./DeleteButton";
import { toast } from "react-hot-toast";

const Certifications = () => {
  const { subpages } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    certificate: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (subpages === "certifications") {
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/certification");
          if (data) {
            setInitialValues(data);
            setIsEdit(true);
          }
          // console.log(data)
        } catch (e) {
          console.log("Failed to fetch Certification details", e);
          toast.error("Failed to fetch Certification details");
        }
      };
      fetchData();
    }
  }, [subpages]);
  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      if (isEdit) {
        await axios.put("/certifications", values);
        toast.success(" Details Updated Successfully");
      } else {
        await axios.post("/certifications", values);
        toast.success("Details Saved Successfully");
        onSubmitProps.resetForm();
      }
      navigate("/create-resume");
    } catch (e) {
      console.log("Failed To Submit Details", e);
      toast.error("Failed To Submit Details");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete("/certification");
      toast.success("Details Deleted Succesfully");
      navigate("/create-resume/");
    } catch (e) {
      console.log("Failed to delete certification Details");
      toast.error("Failed to Delete details");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      <Form className=" relative group  shadow-md shadow-slate-950 rounded-2xl py-6 px-8">
        <FormikControl
          control="textarea"
          name="certificate"
          label="Certification/ Achievements"
          placeholder="Cisco Certification, AWS Cloud Certification"
        />

        <div className="button">
          <button
            className="text-slate-200 font-blod uppercase text-sm "
            type="submit"
          >
            {isEdit ? "update" : "save"}
          </button>
        </div>
        {isEdit && <Button handleDelete={handleDelete} />}
      </Form>
    </Formik>
  );
};

export default Certifications;
