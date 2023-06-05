import { Field, ErrorMessage } from "formik";
import { formProps } from "../interfaces/form";
import TextError from "../components/TextError";

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
      <ErrorMessage name={name}>
      {(errorMsg) => <TextError>{errorMsg}</TextError>}
      </ErrorMessage>
    </div>
  );
};

export default Input;