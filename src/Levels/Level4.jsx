import React, { useState, useEffect } from "react";

const Level4 = ({ colbacknext }) => {
    const gameAreaSize = 800; // Game area is 800x800
    const step = 50; // Movement step to match the grid
    const boxSize = 50; // Player size

    // Starting and winning positions
    const [position, setPosition] = useState({ top: 50, left: 50 });
    const winposition = { top: 450, left: 750 };
    const [popwon, setpopwon] = useState(false);

    // Maze-like obstacles (White Blocks)
    const obstacles = [
        { top: 100, left: 0, width: 300, height: 50 },
        { top: 100, left: 400, width: 300, height: 50 },
        { top: 200, left: 200, width: 50, height: 200 },
        { top: 300, left: 500, width: 300, height: 50 },
        { top: 400, left: 200, width: 200, height: 50 },
        { top: 400, left: 600, width: 200, height: 50 },
        { top: 500, left: 300, width: 50, height: 200 },
        { top: 600, left: 0, width: 600, height: 50 }
    ];

    // Collision Detection Function
    const isColliding = (newTop, newLeft) => {
        return obstacles.some(obstacle =>
            newTop < obstacle.top + obstacle.height &&
            newTop + boxSize > obstacle.top &&
            newLeft < obstacle.left + obstacle.width &&
            newLeft + boxSize > obstacle.left
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
                        if (prev.top < gameAreaSize - boxSize && !isColliding(prev.top + step, prev.left)) {
                            newTop += step;
                        }
                        break;
                    case "ArrowLeft":
                        if (prev.left > 0 && !isColliding(prev.top, prev.left - step)) {
                            newLeft -= step;
                        }
                        break;
                    case "ArrowRight":
                        if (prev.left < gameAreaSize - boxSize && !isColliding(prev.top, prev.left + step)) {
                            newLeft += step;
                        }
                        break;
                    default:
                        return prev;
                }

                // Check if player reaches the winning position
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

            <div className="h-screen bg-purple-400 p-10 flex items-center justify-center">
                <div className="relative w-[800px] h-[800px] bg-slate-400">
                    {/* Player (Red Box) */}
                    <div
                        className="h-[50px] w-[50px] absolute z-50 bg-red-500"
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

                    {/* Winning Position (Blue Box) */}
                    <div
                        className="h-[50px] w-[50px] absolute bg-blue-500"
                        style={winposition}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Level4;
