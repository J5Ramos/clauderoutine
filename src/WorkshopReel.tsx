import {makeReel} from './Reel';
import {NOCTURNO} from './theme';
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

// "Estudia inteligente, piensa por ti mismo" — para universitarios.
export const EstudiaReel = makeReel(
  [
    HookScene,
    TitleScene,
    ProblemScene,
    ThesisScene,
    BenefitsScene,
    ChallengeScene,
    MessageScene,
    OutroScene,
  ],
  [90, 135, 165, 120, 255, 135, 150, 195],
  'estudia',
  NOCTURNO,
);
