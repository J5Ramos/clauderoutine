import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PAPEL, useText} from './theme';
import {Marker, Pop, Scene, Tag, WordReveal} from './components';
import {BenefitsList, Outro} from './scenes';
import {makeReel} from './Reel';

// "Educar en la era de la Inteligencia Artificial" — para docentes, madres, padres y tutores.

// 1. Gancho
const HookScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, ds} = useText();
  return (
    <Scene duration={duration}>
      <WordReveal
        text="Tus hijos ya usan IA."
        stagger={5}
        style={{...display, fontSize: ds(150)}}
        highlight={{ia: t.primary}}
      />
      <div style={{height: 50}} />
      <Pop delay={32}>
        <div style={{...display, fontSize: ds(118), fontStyle: 'italic', color: t.secondary}}>
          ¿Y tú sabes cómo guiarlos?
        </div>
      </Pop>
    </Scene>
  );
};

// 2. Título
const TitleScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, body, ds} = useText();
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s1 = spring({frame: frame - 6, fps, config: {damping: 12}});
  const s2 = spring({frame: frame - 18, fps, config: {damping: 12}});
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <Tag>Conferencia – Workshop</Tag>
      </Pop>
      <div style={{height: 60}} />
      <div style={{...display, fontSize: ds(150), transform: `scale(${s1})`, opacity: s1}}>
        Educar en la era de la
      </div>
      <div style={{height: 20}} />
      <div
        style={{
          ...display,
          fontSize: ds(150),
          fontStyle: 'italic',
          transform: `scale(${s2})`,
          opacity: s2,
          color: t.primary,
        }}
      >
        Inteligencia Artificial
      </div>
      <div style={{height: 60}} />
      <Pop delay={34}>
        <div style={{...body, fontSize: 46, color: t.muted, fontWeight: 600}}>
          Lo que maestros y padres necesitan saber para acompañar a las nuevas generaciones
        </div>
      </Pop>
    </Scene>
  );
};

// 3. Contexto + la pregunta
const QuestionScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, body, ds} = useText();
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <div style={{...body, fontSize: 60, fontWeight: 600}}>
          Nuestros hijos y alumnos crecen en un mundo donde la IA ya es parte de su{' '}
          <span style={{color: t.secondary, fontWeight: 800}}>vida cotidiana</span>.
        </div>
      </Pop>
      <div style={{height: 90}} />
      <Pop delay={45}>
        <Tag color={t.secondary}>La pregunta</Tag>
      </Pop>
      <div style={{height: 50}} />
      <Pop delay={55}>
        <div style={{...display, fontSize: ds(110)}}>
          ¿Estamos los adultos{' '}
          <Marker delay={78} color={t.primary}>
            preparados
          </Marker>{' '}
          para enseñarles a usarla bien?
        </div>
      </Pop>
    </Scene>
  );
};

// 4. Para quién / sin tecnicismos
const AccessScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, body, ds} = useText();
  return (
    <Scene duration={duration}>
      <WordReveal
        text="La IA al alcance de maestros y familias"
        stagger={4}
        style={{...display, fontSize: ds(124)}}
        highlight={{maestros: t.secondary, familias: t.primary}}
      />
      <div style={{height: 50}} />
      <Pop delay={36}>
        <div style={{...body, fontSize: 52, fontWeight: 800, color: t.muted}}>
          Sin necesidad de conocimientos tecnológicos
        </div>
      </Pop>
      <div style={{height: 60}} />
      <div style={{display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center'}}>
        {[
          ['Oportunidades', t.secondary],
          ['Riesgos', t.danger],
          ['Aplicaciones educativas', t.primary],
        ].map(([label, color], i) => (
          <Pop key={label} delay={52 + i * 8}>
            <Tag color={color}>{label}</Tag>
          </Pop>
        ))}
      </div>
    </Scene>
  );
};

// 5. Temas
const TopicsScene: React.FC<{duration: number}> = ({duration}) => {
  const {t} = useText();
  return (
    <BenefitsList
      duration={duration}
      title={
        <>
          Con demostraciones y{' '}
          <span style={{color: t.primary, fontStyle: 'italic'}}>ejercicios prácticos</span>
        </>
      }
      items={[
        'Qué es la IA y qué pueden hacer hoy los estudiantes con ella',
        'Cuándo ayuda a aprender y cuándo sustituye el esfuerzo',
        'ChatGPT como apoyo educativo y tutor de aprendizaje',
        'Acompañar tareas sin permitir que la IA haga todo',
        'Pensamiento crítico, creatividad y razonamiento',
        'Privacidad, desinformación, dependencia y uso inadecuado',
        'Acuerdos y límites saludables en casa y en el aula',
      ]}
    />
  );
};

// 6. La experiencia
const ExperienceScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, body, ds} = useText();
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <Tag color={t.secondary}>La experiencia</Tag>
      </Pop>
      <div style={{height: 60}} />
      <Pop delay={8}>
        <div style={{...display, fontSize: ds(108)}}>
          Padres y maestros usarán la IA para resolver{' '}
          <span style={{color: t.secondary, fontStyle: 'italic'}}>situaciones educativas reales</span>
        </div>
      </Pop>
      <div style={{height: 70}} />
      <Pop delay={45}>
        <div style={{...body, fontSize: 56, fontWeight: 600}}>
          y la convertirán en una{' '}
          <span style={{color: t.primary, fontWeight: 800}}>aliada del aprendizaje</span>.
        </div>
      </Pop>
    </Scene>
  );
};

// 7. Mensaje central (1/2)
const FutureScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, ds} = useText();
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <div style={{...display, fontSize: 260, color: t.primary, lineHeight: 0.6, height: 130}}>
          “
        </div>
      </Pop>
      <WordReveal
        text="No podemos preparar a nuestros hijos y alumnos para el futuro"
        delay={6}
        stagger={4}
        style={{...display, fontSize: ds(112)}}
        highlight={{futuro: t.secondary}}
      />
      <div style={{height: 40}} />
      <WordReveal
        text="con las herramientas y reglas del pasado."
        delay={56}
        stagger={4}
        style={{...display, fontSize: ds(96), fontStyle: 'italic', color: t.muted}}
        highlight={{pasado: t.primary}}
      />
    </Scene>
  );
};

// 8. Mensaje central (2/2)
const NotForbidScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, ds} = useText();
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [22, 36], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <div style={{...display, fontSize: ds(116), position: 'relative', color: t.muted}}>
          No se trata de prohibir la IA
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '52%',
              height: 12,
              width: `${strike}%`,
              background: t.danger,
              borderRadius: 6,
              transform: 'rotate(-2deg)',
            }}
          />
        </div>
      </Pop>
      <div style={{height: 70}} />
      <WordReveal
        text="sino de aprender a educar en un mundo donde ya existe."
        delay={40}
        stagger={4}
        style={{...display, fontSize: ds(120)}}
        highlight={{educar: t.primary, existe: t.secondary}}
      />
    </Scene>
  );
};

// 9. Cierre
const OutroScene: React.FC<{duration: number}> = ({duration}) => (
  <Outro
    duration={duration}
    chips={['Conferencia – Workshop', '3 horas', 'Docentes, madres, padres y tutores']}
    cta="Lleva este workshop a tu escuela"
  />
);

export const EducarReel = makeReel(
  [
    HookScene,
    TitleScene,
    QuestionScene,
    AccessScene,
    TopicsScene,
    ExperienceScene,
    FutureScene,
    NotForbidScene,
    OutroScene,
  ],
  [105, 135, 170, 135, 285, 135, 140, 135, 195],
  'educar',
  PAPEL,
);
