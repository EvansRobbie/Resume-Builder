import imageSvg from "../assets/resume.svg";

const Start = () => {
  return (
    <div className="w-full h-full max-h-screen">
      <img
        className="w-full h-full object-cover"
        src={imageSvg}
        alt="/ResumeSvg"
      />
    </div>
  );
};

export default Start;
