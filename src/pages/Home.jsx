import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Levelone from '../Levels/Levelone';
import Level2 from '../Levels/Levol2';

const Home = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const nextlevel=parseInt(id)+1;


    const [currentLevel, setCurrentLevel] = useState(null);
    const colbacknext = () => {
        navigate(`/level/${nextlevel}`);
    }

    const levels = {
        1: <Levelone colbacknext={colbacknext} />,
        2: <Level2 colbacknext={colbacknext} />,
        3: <Levelone colbacknext={colbacknext} />,
        4: <Levelone colbacknext={colbacknext} />,
        5: <Levelone colbacknext={colbacknext} />,
        6: <Levelone colbacknext={colbacknext} />,
        7: <Levelone colbacknext={colbacknext} />,
        8: <Levelone colbacknext={colbacknext} />,
        9: <Levelone colbacknext={colbacknext} />,
        10: <Levelone colbacknext={colbacknext} />,


    };

    useEffect(() => {
        // Ensure the ID is a valid number and exists in levels
        if (levels[id]) {
            setCurrentLevel(levels[id]);
        } else {
            setCurrentLevel(<h2>Invalid Level</h2>);
        }
    }, [id]);

    return (
        <div>
            {currentLevel}
        </div>
    );
};

export default Home;
