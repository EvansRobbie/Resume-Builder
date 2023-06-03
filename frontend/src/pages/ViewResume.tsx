import { useState, useEffect } from "react";
import axios from "axios";
import html2pdf from 'html2pdf.js';

interface resumeProps {
  personal: {
    name: string;
    email: string;
    address: string;
    phone: string;
    website: string;
    linked: string;
  }[];
  objective: {
    objective: string;
  }[];
  experience: {
    companyName: string;
    jobTitle: string;
    start: string;
    end: string;
    details: string;
  }[];
  education: {
    course: string;
    school: string;
    grade: string;
    year: string;
  }[];
  skills: {
    content: string;
  }[];
  projects: {
    title: string;
    description: string;
  }[];
  certification: {
    certificate: string;
  }[];
  reference: {
    name: string;
    title: string;
    companyName: string;
    email: string;
    phone: string;
  }[];
}
const ViewResume = ({handleModal}:{handleModal:() => void}) => {
  const [resumeData, setResumeData] = useState<resumeProps | null>(null);
const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true)
      const { data } = await axios.get("/resume");
      setResumeData(data);
      setIsLoading(false)
    };
    
    fetchData();
  }, []);
  if(isLoading){
    return <div className="flex items-center h-screen justify-center w-full">Loading...</div>
  }
  // console.log(resumeData)
  // console.log(personal)
  const handleDownload = () =>{
    const element = document.getElementById('resume')
    // generate pdf from the resume
    html2pdf().from(element).save('resume.pdf')
  }
  return (
    <div className="w-full min-h-screen  max-h-[150vh] absolute top-0 left-0 opacity-100 z-20 py-4 px-20 bg-slate-200">
        <div onClick={handleModal} className="fixed top-10 left-10 opacity-100 z-30 cursor-pointer bg-slate-100 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
        </svg>

        </div>
        <div className="max-w-3xl mx-auto " id="resume">
            {resumeData?.personal && (
                <div className="flex flex-col items-center py-8">
                <h1 className="text-2xl font-bold uppercase m-0">
                    {resumeData?.personal[0].name}
                </h1>
                <h2 className="font-semibold text-sm m-0">
                    {resumeData?.personal[0].address}
                </h2>
                <div className="text-sm font-semibold">
                    {resumeData?.personal[0].phone} | {resumeData?.personal[0].email}
                </div>
                <div className="flex gap-2 text-sm items-center">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                    >
                    <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                    </svg>
                    <a href={resumeData?.personal[0].website} target="__blank">{resumeData?.personal[0].website}</a>
                </div>
                <div>
                    <a href={resumeData?.personal[0].linked} target="__blank" className="text-sm">{resumeData?.personal[0].linked}</a>
                </div>
                </div>
            )}

            {resumeData?.objective && (
                <div>
                <div className="heading-bg">
                    <h1 className="h1">objective</h1>
                </div>
                <div className="py-2 text-sm px-4">
                    {resumeData?.objective[0].objective}
                </div>
                </div>
            )}
            {resumeData?.experience && (
                <div>
                <div className="heading-bg">
                    <h1 className="h1">Experience</h1>
                </div>
                <div className="px-4 py-2 text-sm">
                    <h2 className=" font-semibold">
                    {resumeData?.experience[0].companyName}
                    </h2>
                    <span className="italic">
                    {resumeData?.experience[0].start}- {resumeData?.experience[0].end}
                    </span>
                    <div className="">{resumeData?.experience[0].jobTitle} </div>
                    <p className="">{resumeData?.experience[0].details}</p>
                </div>
                </div>
            )}
            {resumeData?.education && (
                <div>
                <div className="heading-bg">
                    <h1 className="h1">Education</h1>
                </div>
                <div className="px-4 py-2 text-xs">
                    <h2 className=" font-semibold">
                    {resumeData?.education[0].school}
                    </h2>
                    <span className="italic text-xs">
                    {resumeData?.education[0].year}
                    </span>
                    <div className="">{resumeData?.education[0].course} </div>
                    <p className="">{resumeData?.education[0].grade}</p>
                </div>
                </div>
            )}
            {resumeData?.skills && (
                <div>
                <div className="heading-bg">
                    <h1 className="h1">Skills</h1>
                </div>
                <div className="py-2 text-sm px-4" dangerouslySetInnerHTML={{__html: resumeData?.skills[0].content || ''}}/>
                    {/* {resumeData?.skills[0].content} */}
                {/* </div> */}
                </div>
            )}
            {resumeData?.projects && (
                <div>
                <div className="heading-bg ">
                    <h1 className="h1">Projects</h1>
                </div>
                <div className="px-4 py-2 text-xs">
                    <h2 className=" font-semibold">{resumeData?.projects[0].title}</h2>
                    <p className="">{resumeData?.projects[0].description}</p>
                </div>
                </div>
            )}
            {resumeData?.certification && (
                <div>
                <div className="heading-bg">
                    <h1 className="h1">certifications & Achievements</h1>
                </div>
                <div className="py-2 text-sm px-4">
                    {resumeData?.certification[0].certificate}
                </div>
                </div>
            )}
            {resumeData?.reference && (
                <div>
                <div className="heading-bg">
                    <h1 className="h1">Reference</h1>
                </div>
                <div className="px-4 py-2 text-xs flex flex-col gap-1">
                    <h2 className=" font-semibold">{resumeData?.reference[0].name}</h2>
                    <span className="">{resumeData?.reference[0].companyName}</span>
                    <div className="">{resumeData?.reference[0].email} </div>
                    <p className="">{resumeData?.reference[0].phone}</p>
                </div>
                </div>
            )}
          
        </div>
        <button onClick={handleDownload} className="bg-cyan-500 px-4 py-1 flex justify-center items-center hover:bg-slate-950 duration-300 ease-in active:scale-105 max-w-sm mx-auto rounded-md text-slate-200 text-sm">
                Download
            </button>
    </div>
  );
};

export default ViewResume;
