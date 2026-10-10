import React from 'react';
import {Composition} from 'remotion';
import {FPS} from './Reel';
import {EstudiaReel} from './WorkshopReel';
import {EducarReel} from './EducarReel';

const REELS = [
  {id: 'WorkshopReel', reel: EstudiaReel},
  {id: 'EducarReel', reel: EducarReel},
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {REELS.map(({id, reel}) => (
        <Composition
          key={id}
          id={id}
          component={reel.Component}
          durationInFrames={reel.baseDurations.reduce((a, b) => a + b, 0)}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={{withAudio: true, sceneDurations: reel.baseDurations}}
          calculateMetadata={reel.calculateMetadata}
        />
      ))}
    </>
  );
};
