import React, { useEffect } from "react";

interface WelcomeScreenProps {
  onComplete: () => void; // Callback pour signaler la fin de l'animation/vidéo
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  // Effet pour s'assurer que le callback est bien nettoyé
  useEffect(() => {
    return () => {
      // Nettoyage éventuel si nécessaire
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-amber-50 overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={`${process.env.PUBLIC_URL}/sons/welcome.mp4`}
        autoPlay
        muted
        onEnded={onComplete} // Appelle onComplete lorsque la vidéo se termine
        onError={() => {
          console.error("Erreur lors du chargement de la vidéo.");
          onComplete(); // Redirige même en cas d'erreur
        }}
      />
    </div>
  );
};

export default WelcomeScreen;
