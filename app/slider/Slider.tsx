"use client"; // This is a client component 👈🏽
import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCirclePlay,
  faCircleStop,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useSlider, useSliderAudio } from "./slider.hooks";
import { SliderData } from "./slider.types";

type SliderProps = {
  slides: SliderData[];
  showMuteControls?: boolean;
  showVolumeControls?: boolean;
};

const Slider: FC<SliderProps> = ({
  slides,
  showMuteControls = false,
  showVolumeControls = false,
}) => {
  const {
    currentIndex,
    handleGoToPreviousSlide,
    handleGoToNextSlide,
    handleGoToSpecficSlide,
    handleTouchStart,
    handleTouchMove,
  } = useSlider(slides.length);

  const {
    isPlaying,
    isMuted,
    volume,
    audioRef,
    handleToggleMute,
    handleToggleAudio,
    handleVolumeChange,
  } = useSliderAudio({
    currentIndex,
    handleGoToPreviousSlide,
    handleGoToNextSlide,
  });

  return (
    <div
      className="h-full relative overflow-hidden"
      // Below 2 lines are to support touch events on mobile devices
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* The left-right controls to be hidden in mobile devices and only visible in medium and large screens */}
      <div className="hidden lg:block md:block">
        <div
          className="absolute top-1/2 left-8 text-xl text-black z-10 cursor-pointer bg-white rounded-3xl py-1.5 px-3 opacity-90 translate-x-0 -translate-y-1/2"
          onClick={handleGoToPreviousSlide}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div
          className="absolute top-1/2 right-8 text-xl text-black z-10 cursor-pointer bg-white rounded-3xl py-1.5 px-3 opacity-90 translate-x-0 -translate-y-1/2"
          onClick={handleGoToNextSlide}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>

      {/* Slides Container */}
      <div
        className="flex"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {slides.map((slide, index) => (
          <div
            className="w-full relative overflow-hidden "
            style={{
              flex: "0 0 100%",
            }}
            key={index}
          >
            {index === currentIndex && (
              <audio ref={audioRef} src={slide.audioURL} />
            )}
            <img
              className="w-full h-full object-cover"
              src={slide.imageURL}
              alt={slide.description}
            />
          </div>
        ))}
      </div>

      {/* Play/pause controls */}
      <div
        className="flex justify-center absolute left-1/2 right-1/2 bottom-16 text-white text-5xl"
        onClick={handleToggleAudio}
      >
        <FontAwesomeIcon icon={isPlaying ? faCircleStop : faCirclePlay} />
      </div>

      {/*  Volume controls */}
      {showVolumeControls && (
        <div className="absolute bottom-16 left-8 text-xl text-black z-10 cursor-pointer bg-white rounded-3xl py-2.5 px-3 opacity-90">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      )}

      {/* Mute/Unmute controls */}
      {showMuteControls && (
        <div
          className="absolute bottom-16 right-8 text-xl text-black z-10 cursor-pointer bg-white rounded-3xl py-2.5 px-3 opacity-90"
          onClick={handleToggleMute}
        >
          <FontAwesomeIcon icon={isMuted ? faVolumeHigh : faVolumeXmark} />
        </div>
      )}

      {/* Dots container */}
      <div className="flex justify-center absolute left-1/2 right-1/2 bottom-7">
        {slides.map((slide, slideIndex) => (
          <div
            className={`cursor-pointer mx-1 my-0 rounded-lg border-[6px] border-solid ${
              currentIndex === slideIndex
                ? "border-white"
                : "border-neutral-500"
            }`}
            key={slideIndex}
            onClick={() => handleGoToSpecficSlide(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export { Slider };
