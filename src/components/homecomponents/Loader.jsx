import React, { useContext } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/loading.json';
import { AuthContext } from '../../context/AuthContext';

const Loader = () => {

    const { loading } = useContext(AuthContext);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={`loading-animation ${loading ? 'visible' : 'invisible'}`}>
            <Lottie options={defaultOptions} height={200} width={200} />
        </div>
    );
};

export default Loader;
