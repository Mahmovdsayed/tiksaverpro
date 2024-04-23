import React from "react";
import { Button } from "@nextui-org/react";
import { Triangle } from "react-loader-spinner";

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#F31260"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
};

export default LoadingScreen;