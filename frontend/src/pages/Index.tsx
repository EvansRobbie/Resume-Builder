import { useState } from "react";
import { Link } from "react-router-dom";
const Index = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-full h-screen absolute top-0 left-0 -z-10 opacity-100">
        <img
          className="w-full h-full object-cover"
          src="https://cdnp1.stackassets.com/762a8c072b98a73cd68b82bbd66376b695b729c3/store/6c1ca47bad8ef3ed461f820237a5202004078112c3323aceef607f3e5b3f/sale_321091_primary_image.jpg"
          alt="/home/image"
        />
      </div>
      <div className="max-w-lg bg-slate-900/70 backdrop-blur mx-4 backdrop-filter px-4 py-1.5 text-slate-950 rounded-2xl">
        <p className="text-slate-200 text-sm py-4">
          Build your professional resume effortlessly with our intuitive resume
          builder. Create a standout resume that highlights your skills,
          experience, and achievements. Our user-friendly interface makes it
          easy to customize your resume to suit your unique career goals. Stand
          out from the competition and increase your chances of landing your
          dream job. Start crafting your perfect resume today!
        </p>
      </div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex relative z-10 items-center gap-0 py-1 group bg-transparent backdrop-blur backdrop-filter px-4 rounded-2xl "
      >
        <div
          className={`bg-slate-950 relative z-10 text-slate-100 rounded-full inline-block p-2`}
        >
          {hover ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
        </div>
        <Link
          to="/create-resume"
          className="group-hover:bg-slate-950 bg-gradient-to-r from-transparent to-slate-900 -ml-4 pl-6 pr-3 rounded-r-full py-2 duration-500 ease-in"
        >
          <button className="text-slate-100 outline-none group-hover:text-slate-100 text-sm">
            Build Resume
          </button>
        </Link>
      </div>
      <div className="absolute top-0 left-0 bg-gradient-to-bl from-slate-900/50 to-transparent z-0 w-full h-screen " />
    </div>
  );
};

export default Index;
