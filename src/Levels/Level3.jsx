import React, { useState, useEffect } from "react";

const Level3 = ({ colbacknext }) => {
    const winposition = { top: 700, left: 400 };
    const [position, setPosition] = useState({ top: 50, left: 50 });
    const [popwon, setpopwon] = useState(false);
    const step = 10; // Movement step

    // List of obstacles (white divs)
    const obstacles = [
        { top: 100, left: 0, width: 1200, height: 50 },
        { top: 200, left: 620, width: 1200, height: 50 },
        { top: 300, left: 0, width: 1200, height: 50 },
        { top: 400, left: 620, width: 1200, height: 50 },
        { top: 500, left: 0, width: 1200, height: 50 },
        { top: 600, left: 620, width: 1200, height: 50 }
    ];

    // Function to check if the next position collides with an obstacle
    const isColliding = (newTop, newLeft) => {
        return obstacles.some(obstacle =>
            newTop < obstacle.top + obstacle.height &&
            newTop + 50 > obstacle.top &&
            newLeft < obstacle.left + obstacle.width &&
            newLeft + 50 > obstacle.left
        );
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            setPosition((prev) => {
                let newTop = prev.top;
                let newLeft = prev.left;

                switch (event.key) {
                    case "ArrowUp":
                        if (prev.top > 0 && !isColliding(prev.top - step, prev.left)) {
                            newTop -= step;
                        }
                        break;
                    case "ArrowDown":
                        if (prev.top < window.innerHeight - 150 && !isColliding(prev.top + step, prev.left)) {
                            newTop += step;
                        }
                        break;
                    case "ArrowLeft":
                        if (prev.left > 0 && !isColliding(prev.top, prev.left - step)) {
                            newLeft -= step;
                        }
                        break;
                    case "ArrowRight":
                        if (prev.left < window.innerWidth - 150 && !isColliding(prev.top, prev.left + step)) {
                            newLeft += step;
                        }
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

    return (
        <div>
            {popwon && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="rounded-xl p-6 w-full max-w-md bg-white text-center">
                        <h1 className="text-xl font-bold text-black">Congratulations! You solved the puzzle!</h1>
                        <button
                            className="mt-4 w-[150px] h-[40px] bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600"
                            onClick={() => { setpopwon(false); setPosition({ top: 50, left: 50 }); }}
                        >
                            Play Again
                        </button>
                        <button
                            className="mt-4 w-[150px] h-[40px] bg-red-500 text-white font-bold rounded-md hover:bg-red-600 ml-2"
                            onClick={colbacknext}
                        >
                            Next Level
                        </button>
                    </div>
                </div>
            )}
            <div className="h-[100vh] bg-purple-400 p-[50px]">
                <div className="h-[100%] bg-slate-400 relative">
                    {/* Player Box */}
                    <div
                        className="h-[50px] w-[50px] absolute z-50 bg-red-400"
                        style={{ top: position.top, left: position.left }}
                    ></div>

                    {/* Obstacles (White Blocks) */}
                    {obstacles.map((obstacle, index) => (
                        <div
                            key={index}
                            className="bg-white absolute"
                            style={{
                                top: obstacle.top,
                                left: obstacle.left,
                                width: obstacle.width,
                                height: obstacle.height
                            }}
                        ></div>
                    ))}

                    {/* Win Position (Blue Box) */}
                    <div
                        className="h-[50px] w-[50px] absolute bg-blue-400"
                        style={winposition}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Level3;
