import React from "react";
import { TypeAnimation } from "react-type-animation";

function WelcomeHome() {
    return (
            <TypeAnimation
            sequence={[
            'Welcome To ShoeMedia'
            ]}
            wrapper="div"
            cursor={true}
            repeat={1}
        />
    );
}

export default WelcomeHome;