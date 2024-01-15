import { Slider, sliderData } from "./slider";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="w-full md:h-[800px] sd:h-[230px] mx-0 my-auto">
        <Slider slides={sliderData} showMuteControls showVolumeControls />
      </div>
    </main>
  );
}
