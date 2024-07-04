import React, { useState } from 'react';
import Joyride, { STATUS } from 'react-joyride';

const Tour = () => {
    const [runTour, setRunTour] = useState(true);

    const steps = [
        {
            target: '.step-1',
            content: 'Welcome to our app! This is the first step.',
        },
        {
            target: '.step-2',
            content: 'Here you can view your dashboard.',
        },
    ];

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRunTour(false);
        }
    };

    return (
        <Joyride
            steps={steps}
            run={runTour}
            continuous={true}
            showSkipButton={true}
            callback={handleJoyrideCallback}
        />
    );
};

export default Tour;