import { SignalField } from "../components/hero/SignalField.jsx";
import { HeroContent } from "../components/hero/HeroContent.jsx";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <SignalField density={1} interactive />
      </div>
      <HeroContent />
    </div>
  );
}
