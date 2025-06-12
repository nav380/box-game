import React, { useState, useEffect } from "react";

const Level3 = ({ colbacknext }) => {
    const gameAreaWidth = 1200; // Increased width
    const gameAreaHeight = 600; // Decreased height
    const step = 50;
    const boxSize = 50;

    const [playerPosition, setPlayerPosition] = useState({ top: 50, left: 50 });
    const winPosition = { top: 500, left: 1150 };

    const [pushBox, setPushBox] = useState({ top: 250, left: 500 });

    const [popWon, setPopWon] = useState(false);

    const obstacles = [
        { top: 100, left: 50, width: 1100, height: 50 },
        { top: 200, left: 50, width: 50, height: 400 },
        { top: 200, left: 200, width: 950, height: 50 },
        { top: 300, left: 1150, width: 50, height: 200 },
        { top: 400, left: 300, width: 500, height: 50 },
        { top: 500, left: 50, width: 200, height: 50 },
        { top: 500, left: 800, width: 200, height: 50 }
    ];

    const isColliding = (newTop, newLeft, targetBox) => {
        return obstacles.some(obstacle =>
            newTop < obstacle.top + obstacle.height &&
            newTop + boxSize > obstacle.top &&
            newLeft < obstacle.left + obstacle.width &&
            newLeft + boxSize > obstacle.left
        ) || (
            newTop === targetBox.top && newLeft === targetBox.left
        );
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            setPlayerPosition((prev) => {
                let newTop = prev.top;
                let newLeft = prev.left;

                switch (event.key) {
                    case "ArrowUp":
                        if (prev.top > 0 && !isColliding(prev.top - step, prev.left, pushBox)) {
                            if (prev.top - step === pushBox.top && prev.left === pushBox.left) {
                                if (!isColliding(pushBox.top - step, pushBox.left, {})) {
                                    setPushBox((prevPush) => ({ ...prevPush, top: prevPush.top - step }));
                                }
                            } else {
                                newTop -= step;
                            }
                        }
                        break;
                    case "ArrowDown":
                        if (prev.top < gameAreaHeight - boxSize && !isColliding(prev.top + step, prev.left, pushBox)) {
                            if (prev.top + step === pushBox.top && prev.left === pushBox.left) {
                                if (!isColliding(pushBox.top + step, pushBox.left, {})) {
                                    setPushBox((prevPush) => ({ ...prevPush, top: prevPush.top + step }));
                                }
                            } else {
                                newTop += step;
                            }
                        }
                        break;
                    case "ArrowLeft":
                        if (prev.left > 0 && !isColliding(prev.top, prev.left - step, pushBox)) {
                            if (prev.left - step === pushBox.left && prev.top === pushBox.top) {
                                if (!isColliding(pushBox.top, pushBox.left - step, {})) {
                                    setPushBox((prevPush) => ({ ...prevPush, left: prevPush.left - step }));
                                }
                            } else {
                                newLeft -= step;
                            }
                        }
                        break;
                    case "ArrowRight":
                        if (prev.left < gameAreaWidth - boxSize && !isColliding(prev.top, prev.left + step, pushBox)) {
                            if (prev.left + step === pushBox.left && prev.top === pushBox.top) {
                                if (!isColliding(pushBox.top, pushBox.left + step, {})) {
                                    setPushBox((prevPush) => ({ ...prevPush, left: prevPush.left + step }));
                                }
                            } else {
                                newLeft += step;
                            }
                        }
                        break;
                    default:
                        return prev;
                }

                if (newTop === winPosition.top && newLeft === winPosition.left) {
                    setPopWon(true);
                }

                return { top: newTop, left: newLeft };
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [pushBox]);

    return (
        <div>
            {popWon && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="rounded-xl p-6 w-full max-w-md bg-white text-center">
                        <h1 className="text-xl font-bold text-black">You Solved the Puzzle!</h1>
                        <button
                            className="mt-4 w-[150px] h-[40px] bg-purple-500 text-white font-bold rounded-md hover:bg-purple-600"
                            onClick={() => { setPopWon(false); setPlayerPosition({ top: 50, left: 50 }); }}
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
                <div className="relative w-[1200px] h-[600px] bg-slate-400">
                    {/* Player (Red Box) */}
                    <div
                        className="h-[50px] w-[50px] absolute z-50 bg-red-500"
                        style={{ top: playerPosition.top, left: playerPosition.left }}
                    ></div>

                    {/* Pushable Box (Yellow Box) */}
                    <div
                        className="h-[50px] w-[50px] absolute bg-yellow-500"
                        style={{ top: pushBox.top, left: pushBox.left }}
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
                        style={winPosition}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Level3;
