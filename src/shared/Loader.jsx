import React from 'react';
import { DotLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <DotLoader
                color="#ff0000"
                cssOverride={{}}
                loading
                size={100}
                speedMultiplier={1.5}
            />
        </div>
    );
};

export default Loader;