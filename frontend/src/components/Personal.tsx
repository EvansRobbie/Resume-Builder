import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import axios from "axios";
import FormikControl from "../forms/FormikControl";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./DeleteButton";
import { toast } from "react-hot-toast";

const Personal = () => {
  const { subpages } = useParams();
  const navigate = useNavigate();
  //  console.log(params)
  const [isEdit, setIsEdit] = useState(false);
  // const [ready, set]
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    website: "",
    linked: "",
  });
  useEffect(() => {
    if (subpages === "personal") {
      const fetchData = async () => {
        try {
          const { data } = await axios.get("/personal");
          if (data) {
            setInitialValues(data);
            setIsEdit(true);
          }
        } catch (e) {
          console.log("Failed to fetch personal Data", e);
          toast.error("Failed to fetch personal details");
        }
      };
      fetchData();
    }
  }, [subpages]);
  const onSubmit = async (values: any, onSubmitProps: any) => {
    try {
      if (isEdit) {
        await axios.put("/personal", values);
        toast.success(" Details Updated Successfully");
      } else {
        await axios.post("/personal", values);
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
      await axios.delete("/personal");
      toast.success("Details Deleted Succesfully");
      navigate("/create-resume/personal");
    } catch (e) {
      console.log("Failed to delete Personal Details");
      toast.error("Failed to Delete details");
    }
  };
  // console.log(isEdit)
  return (
    // enable initialize helps in pupulating the data that is in the db in the input fields for editing
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      className="py-4"
    >
      <Form className="w-full relative flex flex-col group gap-6 shadow-md shadow-slate-950 px-4 py-6 rounded-2xl">
        <div className="grid grid-cols-2 w-full gap-4">
          <FormikControl
            control="input"
            name="name"
            label="Name"
            placeholder="Jane Doe"
          />
          <FormikControl
            control="input"
            name="email"
            label="Email"
            placeholder="janedoe@gmail.com"
          />
        </div>
        <FormikControl
          control="textarea"
          name="address"
          label="Address"
          placeholder="Nairobi, Kenya"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormikControl
            control="input"
            name="phone"
            label="Phone"
            placeholder="+254700000000"
          />
          <FormikControl
            control="input"
            name="website"
            label="Website"
            placeholder="www.janedoe.com"
          />
        </div>
        <FormikControl
          control="input"
          name="linked"
          label="LinkedIn"
          placeholder="www.linkedin/janedoe.com"
        />
        <div className=" button">
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

export default Personal;
