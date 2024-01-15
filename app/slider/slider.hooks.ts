import { TouchEvent, useRef, useState, useEffect, ChangeEvent } from "react";

export const useSlider = (totalSlides: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const handleGoToPreviousSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleGoToNextSlide = () => {
    const isLastSlide = currentIndex === totalSlides - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleGoToSpecficSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const currentX = e.touches[0].clientX;
    const difference = touchStartX.current - currentX;

    if (Math.abs(difference) > 30) {
      /**
       * We are using 30 as a threshold to decide at what point we should allow the user to swipe.
       * This number actually decides how smooth the touch should be smaller number means extra smooth swipe and
       * a larger number means a rigid swipe.
       */
      if (difference > 0) {
        // Swipe left
        setCurrentIndex((prevIndex) =>
          prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
        );
      } else {
        // Swipe right
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
        );
      }

      touchStartX.current = null;
    }
  };

  return {
    currentIndex,
    handleGoToPreviousSlide,
    handleGoToNextSlide,
    handleGoToSpecficSlide,
    handleTouchStart,
    handleTouchMove,
  };
};

export const useSliderAudio = ({
  currentIndex,
  handleGoToNextSlide,
  handleGoToPreviousSlide,
}: {
  currentIndex: number;
  handleGoToNextSlide: VoidFunction;
  handleGoToPreviousSlide: VoidFunction;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [isMuted, setIsMuted] = useState(true);

  const [volume, setVolume] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play audio when the component mounts or currentIndex changes
    if (isPlaying) {
      handlePlayAudio();
    } else {
      handleStopAudio();
    }

    // Cleanup function to stop audio when the component unmounts or currentIndex changes
    return () => {
      handleStopAudio();
    };
  }, [currentIndex, isPlaying]);

  useEffect(() => setIsMuted(!isPlaying), [currentIndex]);

  const handlePlayAudio = () => {
    handleStopAudio(); // Stop previous audio if any

    const audioElement = audioRef.current;
    audioElement?.load();
    audioElement?.play();

    // Automatically move to the next slide when audio ends
    audioElement?.addEventListener("ended", handleGoToNextSlide);
  };

  const handleStopAudio = () => {
    const audioElement = audioRef.current;
    audioElement?.pause();
    audioElement!.currentTime = 0;
    audioElement?.removeEventListener("ended", handleGoToPreviousSlide);
  };

  const handleToggleMute = () => {
    setIsMuted((prevMuted) => !prevMuted);
    const audioElement = audioRef.current;
    audioElement!.muted = !audioElement!.muted;
  };

  const handleToggleAudio = () => {
    setIsPlaying((prevPlaying) => !prevPlaying);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    const audioElement = audioRef.current;
    audioElement!.volume = newVolume;
  };

  return {
    isPlaying,
    isMuted,
    volume,
    audioRef,
    handleToggleMute,
    handleToggleAudio,
    handleVolumeChange,
  };
};
