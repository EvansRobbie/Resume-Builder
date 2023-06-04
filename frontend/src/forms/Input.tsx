import { Field } from "formik";
import { formProps } from "../interfaces/form";

// interface formProps {
//     name:string
//     label:string
//   }
const Input = ({ label, name, ...rest }: formProps) => {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        name={name}
        {...rest}
        className="outline-none border border-slate-600 w-full py-1.5 bg-slate-200 px-4 rounded-xl"
      />
    </div>
  );
};

export default Input;
