// import React from 'react'
import React, { useState } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";

import { useMouse, useElementSize, useClickOutside } from "@mantine/hooks";
import Login from "./Login";
import Register from "./Register";
// import Button from "./Button";
interface modalProp {
  loginModal: boolean;
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  // onChange:() => void
}

const LoginModal: React.FC<modalProp> = ({ loginModal, setLoginModal }) => {
  // console.log(loginModal)
  //   return (

  const [toggle, setToggle] = useState(true);
  const [position, setPosition] = useState({ left: -1000, top: -1000 });
  const [opacity, setOpacity] = useState(0);
  const { ref: circlEl, width, height } = useElementSize();
  const { ref: cardEl, x, y } = useMouse();
  const flipAnimation = useSpring({
    transform: toggle
      ? "rotateY(-180deg) translateX(-50%)"
      : "rotateY(0deg) translateX(-50%)",
    config: { tension: 300, friction: 20 },
  });

  const flipPointAnimation = useSpring({
    transform: toggle ? "rotateY(-180deg)" : "rotateY(0deg)",
    config: { tension: 300, friction: 20 },
  });
  const slideBlur = useSpring({
    // transform: toggle ? "translate(0%)" : "translate(100%)",
    config: { tension: 300, friction: 20 },
  });
  const mouseHover = () => {
    setPosition({
      left: x - width / 2,
      top: y - height / 2,
    });
    setOpacity(1);
  };
  const handleMouseLeave = () => {
    setOpacity(0);
  };
  const style = {
    top: position.top,
    left: position.left,
    opacity: opacity,
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const transition = useTransition(loginModal, {
    from: { opacity: 0, scale: 0 }, // transform: "translateY(-50%)"
    enter: { opacity: 1, scale: 1 }, //  transform: "translateY(0%)",
    leave: { opacity: 0, scale: 0 }, // transform: "translateY(-50%)"
  });
  const ref = useClickOutside(() => setLoginModal(false));
  //   console.log(toggle)

  return (
    <div className="flex items-center absolute top-1/2 left-1/2 w-full z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-slate-900 bg-opacity-90 h-screen">
      {transition(
        (styles, item: boolean) =>
          item && (
            <animated.div
              ref={ref}
              style={styles}
              className="max-w-2xl relative items-center  mx-4  md:mx-auto z-10 bg-slate-100 overflow-hidden justify-around shadow-2xl shadow-slate-900 flex grow shrink-0 py-6 px-4 rounded-2xl"
            >
              <div
                className={`${
                  toggle ? "flex" : "hidden"
                } md:flex flex-col gap-2 py-2 md:py-0 md:px-0 px-10 `}
              >
                <Login
                  setLoginModal={setLoginModal}
                  handleToggle={handleToggle}
                />
              </div>
              <div
                className={`${
                  toggle ? "hidden" : "flex"
                } md:flex flex-col gap-2 py-2 md:py-0 md:px-0 px-10  `}
              >
                <Register setToggle={setToggle} handleToggle={handleToggle} />
              </div>
              <animated.div
                ref={cardEl}
                style={flipAnimation}
                onMouseOver={mouseHover}
                onMouseLeave={handleMouseLeave}
                className={` absolute bg-slate-900 group w-1/2 h-full hidden md:block  `}
              >
                <animated.div
                  style={flipPointAnimation}
                  className=" flex flex-col items-center justify-center h-full"
                >
                  <h2 className="text-2xl md:text-4xl font-bold text-slate-200 -pt-5">
                    Hello <span className="text-cyan-500">Friend.</span>{" "}
                  </h2>
                  <p className="text-slate-200 text-lg my-2  md:text-2xl">
                    {toggle
                      ? "Don't have an Account ?"
                      : "Already have an account?"}
                  </p>
                  <div
                    onClick={handleToggle}
                    className="bg-slate-200 relative z-50 opacity-100  px-6 border-cyan-500 border-2 p-0.5 rounded-full shadow-cyan-600 my-4 shadow-2xl"
                  >
                    <button className="text-slate-900 font-semibold">
                      {toggle ? "Register" : "Login"}
                    </button>
                  </div>
                </animated.div>
                <animated.div
                  ref={circlEl}
                  style={{ ...slideBlur, ...style }}
                  className={` absolute  w-48 scale-[1.5] -z-10  blur-3xl  transition-opacity bg-cyan-500  rounded-full shadow-[24px 24px 47px #5a5a5a,
                        -24px -24px 47px #ffffff] h-48`}
                />
              </animated.div>
            </animated.div>
          )
      )}
    </div>
  );
};

export default LoginModal;
