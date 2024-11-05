import React, { useEffect } from "react";

const WelcomeScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-screen flex items-center justify-center bg-amber-50">
      <h1 className="text-3xl font-bold text-amber-800 animate-bounce">
        Bienvenue chez Dabali Choco
      </h1>
    </div>
  );
};

export default WelcomeScreen;
