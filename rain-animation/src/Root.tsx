import { Composition } from "remotion";
import { RainExplainer } from "./RainExplainer";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="RainExplainer"
      component={RainExplainer}
      durationInFrames={2250}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
