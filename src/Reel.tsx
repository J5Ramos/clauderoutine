import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile} from 'remotion';
import {getAudioDurationInSeconds} from '@remotion/media-utils';
import {Background, ProgressBar} from './components';
import {Theme, ThemeContext} from './theme';

export const FPS = 30;

// La voz de cada escena entra unos frames después del corte.
const VO_DELAY = 8;
// Margen tras terminar la frase antes de pasar a la siguiente escena.
const VO_TAIL = 14;
const OUTRO_TAIL = 60;

export type ReelProps = {
  withAudio: boolean;
  sceneDurations: number[];
};

type SceneComponent = React.FC<{duration: number}>;

// Crea un reel a partir de sus escenas, su duración mínima por escena (frames)
// la carpeta de public/audio con vo-1.mp3 … vo-N.mp3 y music.mp3, y su tema visual.
export const makeReel = (
  scenes: SceneComponent[],
  baseDurations: number[],
  audioDir: string,
  theme: Theme,
) => {
  const voFile = (i: number) => staticFile(`audio/${audioDir}/vo-${i + 1}.mp3`);
  const musicFile = staticFile(`audio/${audioDir}/music.mp3`);

  // Ajusta cada escena a la duración real de su toma de voz.
  const calculateMetadata = async ({props}: {props: ReelProps}) => {
    let sceneDurations = baseDurations;
    if (props.withAudio) {
      const voDurations = await Promise.all(
        scenes.map((_, i) => getAudioDurationInSeconds(voFile(i))),
      );
      sceneDurations = voDurations.map((d, i) => {
        const tail = i === scenes.length - 1 ? OUTRO_TAIL : VO_TAIL;
        return Math.max(baseDurations[i], Math.ceil(d * FPS) + VO_DELAY + tail);
      });
    }
    return {
      durationInFrames: sceneDurations.reduce((a, b) => a + b, 0),
      props: {...props, sceneDurations},
    };
  };

  const Component: React.FC<ReelProps> = ({withAudio, sceneDurations}) => {
    const total = sceneDurations.reduce((a, b) => a + b, 0);
    let from = 0;
    return (
      <ThemeContext.Provider value={theme}>
      <AbsoluteFill>
        <Background />
        {scenes.map((Scene, i) => {
          const duration = sceneDurations[i];
          const start = from;
          from += duration;
          return (
            <Sequence key={i} from={start} durationInFrames={duration}>
              <Scene duration={duration} />
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
            src={musicFile}
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
      </ThemeContext.Provider>
    );
  };

  return {Component, calculateMetadata, baseDurations};
};
