import React from "react";
import Input from "./Input";
import Textarea from "./Textarea";

interface formProps {
  control: string;
  name: string;
  label: string;
  placeholder: string;
  type?:string
}
const FormikControl: React.FC<formProps> = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
