import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <ReactQuill
      value={value}
      theme={"snow"}
      className="bg-slate-200 h-full"
      onChange={onChange}
      modules={modules}
    />
  );
};

export default Editor;
