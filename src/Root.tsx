import {Composition} from 'remotion';
import {WorkshopReel, TOTAL_FRAMES} from './WorkshopReel';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="WorkshopReel"
      component={WorkshopReel}
      durationInFrames={TOTAL_FRAMES}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
