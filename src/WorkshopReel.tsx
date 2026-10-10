import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {getAudioDurationInSeconds} from '@remotion/media-utils';
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

export const FPS = 30;

const SCENES: React.FC<{duration: number}>[] = [
  HookScene,
  TitleScene,
  ProblemScene,
  ThesisScene,
  BenefitsScene,
  ChallengeScene,
  MessageScene,
  OutroScene,
];

// Duración mínima de cada escena en frames (sin voz en off).
export const BASE_DURATIONS = [90, 135, 165, 120, 255, 135, 150, 195];

// La voz de cada escena entra unos frames después del corte.
const VO_DELAY = 8;
// Margen tras terminar la frase antes de pasar a la siguiente escena.
const VO_TAIL = 14;
const OUTRO_TAIL = 60;

export type ReelProps = {
  withAudio: boolean;
  sceneDurations: number[];
};

export const voFile = (i: number) => staticFile(`audio/vo-${i + 1}.mp3`);
export const MUSIC_FILE = staticFile('audio/music.mp3');

// Ajusta la duración de cada escena a la duración real de su toma de voz.
export const calculateReelMetadata = async ({props}: {props: ReelProps}) => {
  let sceneDurations = BASE_DURATIONS;
  if (props.withAudio) {
    const voDurations = await Promise.all(
      SCENES.map((_, i) => getAudioDurationInSeconds(voFile(i))),
    );
    sceneDurations = voDurations.map((d, i) => {
      const tail = i === SCENES.length - 1 ? OUTRO_TAIL : VO_TAIL;
      return Math.max(BASE_DURATIONS[i], Math.ceil(d * FPS) + VO_DELAY + tail);
    });
  }
  return {
    durationInFrames: sceneDurations.reduce((a, b) => a + b, 0),
    props: {...props, sceneDurations},
  };
};

export const WorkshopReel: React.FC<ReelProps> = ({withAudio, sceneDurations}) => {
  const total = sceneDurations.reduce((a, b) => a + b, 0);
  let from = 0;
  return (
    <AbsoluteFill>
      <Background />
      {SCENES.map((Component, i) => {
        const duration = sceneDurations[i];
        const start = from;
        from += duration;
        return (
          <Sequence key={i} from={start} durationInFrames={duration}>
            <Component duration={duration} />
            {withAudio ? (
              <Sequence from={VO_DELAY}>
                <Audio src={voFile(i)} />
              </Sequence>
            ) : null}
          </Sequence>
        );
      })}
      {withAudio ? (
        <Audio
          src={MUSIC_FILE}
          volume={(f) =>
            interpolate(f, [0, 20, total - 45, total], [0, 0.16, 0.16, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      ) : null}
      <ProgressBar total={total} />
    </AbsoluteFill>
  );
};
