import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Levelone from '../Levels/Levelone';
import Level2 from '../Levels/Level2';
import Level3 from '../Levels/Level3';
import Level4 from '../Levels/Level4';
import Level5 from '../Levels/Level5';
import Level6 from '../Levels/Level6';
import Level7 from '../Levels/Level7';


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
        3: <Level3 colbacknext={colbacknext} />,
        4: <Level4 colbacknext={colbacknext} />,
        5: <Level5 colbacknext={colbacknext} />,
        6: <Level6 colbacknext={colbacknext} />,
        7: <Level7 colbacknext={colbacknext} />,
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
