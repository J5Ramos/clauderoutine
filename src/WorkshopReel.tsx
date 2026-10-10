import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Background, ProgressBar} from './components';
import {
  BenefitsScene,
  ChallengeScene,
  HookScene,
  MessageScene,
  OutroScene,
  ProblemScene,
  ThesisScene,
  TitleScene,
} from './scenes';

// Duración de cada escena en frames (30 fps).
const SCENES: [React.FC<{duration: number}>, number][] = [
  [HookScene, 90],
  [TitleScene, 135],
  [ProblemScene, 165],
  [ThesisScene, 120],
  [BenefitsScene, 255],
  [ChallengeScene, 135],
  [MessageScene, 150],
  [OutroScene, 195],
];

export const TOTAL_FRAMES = SCENES.reduce((acc, [, d]) => acc + d, 0);

export const WorkshopReel: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill>
      <Background />
      {SCENES.map(([Component, duration], i) => {
        const start = from;
        from += duration;
        return (
          <Sequence key={i} from={start} durationInFrames={duration}>
            <Component duration={duration} />
          </Sequence>
        );
      })}
      <ProgressBar total={TOTAL_FRAMES} />
    </AbsoluteFill>
  );
};
