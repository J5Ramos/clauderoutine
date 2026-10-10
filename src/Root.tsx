import {Composition} from 'remotion';
import {
  BASE_DURATIONS,
  FPS,
  WorkshopReel,
  calculateReelMetadata,
} from './WorkshopReel';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="WorkshopReel"
      component={WorkshopReel}
      durationInFrames={BASE_DURATIONS.reduce((a, b) => a + b, 0)}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{withAudio: true, sceneDurations: BASE_DURATIONS}}
      calculateMetadata={calculateReelMetadata}
    />
  );
};
