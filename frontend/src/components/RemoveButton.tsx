// import React from 'react'

const RemoveButton = ({ remove }: { remove: () => void }) => {
  return (
    <button
      className="absolute top-0 m-2 bg-slate-950 rounded-full text-slate-200 right-10 md:right-12 p-2 text-sm"
      type="button"
      onClick={remove}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 md:w-6 md:h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
      </svg>
    </button>
  );
};

export default RemoveButton;
