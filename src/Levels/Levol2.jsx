import React from 'react'
import { useState, useEffect } from "react";

const Level2 = ({ colbacknext }) => {
    const winposition = { top: 150, left: 400 }
    const [position, setPosition] = useState({ top: 50, left: 50 });
    const [popwon, setpopwon] = useState(false);
    const step = 10; // Movement step
    const boxSize = 50; // Box dimensions


    useEffect(() => {
        const handleKeyDown = (event) => {
            setPosition((prev) => {
                let newTop = prev.top;
                let newLeft = prev.left;

                switch (event.key) {
                    case "ArrowUp":
                        if (prev.top > 55) newTop -= step; // Prevent moving beyond top: 0

                        break;
                    case "ArrowDown":
                        if (cantmovedown(prev)) {
                            if (prev.top < window.innerHeight - 105) newTop += step; // Prevent moving below viewport
                        }
                        break;
                    case "ArrowLeft":
                        if (cantmoveleft(prev)) {
                            if (prev.left > 55) newLeft -= step; // Prevent moving beyond left: 0
                        }
                        break;
                    case "ArrowRight":
                        if (prev.left < window.innerWidth - 105) newLeft += step; // Prevent moving beyond right edge
                        break;
                    default:
                        return prev;


                }

                if (newTop === winposition.top && newLeft === winposition.left) {
                    setpopwon(true);
                }

                return { top: newTop, left: newLeft };
            });
        };

        window.addEventListener("keydown", handleKeyDown);


        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const cantmoveup = (prev) => {
        if (prev.top >= 50 && prev.top <= 100)
            return false;

        return true;
    }
    const cantmovedown = (prev) => {
        if (prev.top <= 100 && prev.left < 800)
            return false;

        return true;
    }
    const cantmoveleft = (prev) => {
        if (prev.top>=50 && prev.top <=100 && prev.left == 800)
            return false;

        return true;
    }
    const cantmoveright = (prev) => {
        if (prev.top >= 50 && prev.top <= 100)
            return false;

        return true;
    }


    return (<div>
        {popwon &&
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 md:p-8 lg:p-16 z-100 backdrop-blur-sm">
                <div className=" rounded-xl p-6 w-full max-h-[90vh] ">
                    <h1 className='text-center text-white font-bold'>Congratulations! You won!</h1>
                </div>
                <div>
                    <button className='mt-4 w-[150px] h-[40px] bg-purple-400 text-white font-bold rounded-md hover:bg-purple-500'
                        onClick={() => { setpopwon(false), setPosition({ top: 50, left: 50 }) }}>
                        Play Again
                    </button>
                    <button className='mt-4 w-[150px] h-[40px] bg-red-400 text-white font-bold rounded-md hover:bg-red-500' onClick={colbacknext}>
                        Next
                    </button>
                </div>
            </div>
        }
        <div className='h-[100vh] bg-purple-400 p-[50px]'>

            <div className='h-[100%] bg-slate-400'>
                <div
                    className='h-[50px] w-[50px] absolute z-50 transform -translate-x-50% -translate-y-50% bg-red-400'
                    style={{ ...position }}
                >

                </div>
                <div className='bg-white h-[50px] w-[750px] top-[100px] absolute'>

                </div>
                <div className='h-[50px] w-[50px] absolute transform -translate-x-50% -translate-y-50% bg-blue-400'
                    style={{ ...winposition }}
                >
                </div>


            </div>
        </div>
    </div>
    )
}

export default Level2
