import React, { useEffect } from "react";

const WelcomeScreen = ({ onComplete }) => {
  useEffect(() => {
    return () => clearTimeout(onComplete);
  }, [onComplete]);

  return (
    <div className="h-screen flex items-center justify-center bg-amber-50 overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={`${process.env.PUBLIC_URL}/sons/welcome.mp4`}
        autoPlay
        muted
        onEnded={onComplete}
      />
    </div>
  );
};

export default WelcomeScreen;
