import { useState, useEffect } from "react";
import { Form, Formik, FieldArray } from "formik";
import axios from "axios";
import FormikControl from "../forms/FormikControl";
import { useNavigate, useParams } from "react-router-dom";

const Reference = () => {
  const { subpages } = useParams();
  const navigate = useNavigate()
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
            setIsEdit(true)
          }
          // console.log(data)
        } catch (e) {
          console.log("Failed to fetch Referee details", e);
        }
      };
      fetchData();
    }
  }, [subpages]);
  const onSubmit = async (values: any, onSubmitProps: any) => {
    // console.log(values)
    try{
      if(isEdit){
        await axios.put('/reference',  { referees: values.referees })
      }else{

        await axios.post('/reference',  { referees: values.referees })
        onSubmitProps.resetForm()
        
      }
      navigate('/create-resume')
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      className='py-4'
    >
      {formik => (
        <Form className='w-full flex flex-col gap-6 py-4'>
          <FieldArray name="referees">
            {({ push, remove }) => (
              <div>
                {formik.values.referees.map((_, index) => (
                  <div key={index}>
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
                    <div className='grid grid-cols-2 gap-4'>
                      <FormikControl
                        control="input"
                        name={`referees[${index}].companyName`}
                        label="Company Name"
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
                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => push({})}>
                  Add
                </button>
              </div>
            )}
          </FieldArray>
          <button
              className='text-slate-200 button font-blod uppercase text-sm disabled:bg-cyan-500/20 cursor-pointer disabled:text-slate-950'
              type='submit'
              disabled={!formik.dirty || !formik.isValid}
            >
              {isEdit ? 'Update' : 'Save'}
            </button>
         
        </Form>
      )}
    </Formik>
  );
};

export default Reference;
