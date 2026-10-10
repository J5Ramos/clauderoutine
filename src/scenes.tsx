import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, fonts} from './theme';
import {Marker, Pop, Scene, Tag, WordReveal} from './components';

const display: React.CSSProperties = {
  fontFamily: fonts.display,
  color: colors.text,
  textTransform: 'uppercase',
  textAlign: 'center',
  lineHeight: 1.02,
};

const body: React.CSSProperties = {
  fontFamily: fonts.body,
  color: colors.text,
  textAlign: 'center',
  lineHeight: 1.3,
};

// 1. Gancho
export const HookScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const shake = frame > 40 && frame < 52 ? Math.sin(frame * 3) * 8 : 0;
  return (
    <Scene duration={duration}>
      <div style={{transform: `translateX(${shake}px)`}}>
        <WordReveal
          text="¿Y si la IA está pensando por ti?"
          stagger={5}
          style={{...display, fontSize: 150}}
          highlight={{ia: colors.cyan, ti: colors.amber}}
        />
      </div>
    </Scene>
  );
};

// 2. Título
export const TitleScene: React.FC<{duration: number}> = ({duration}) => {
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
      <div style={{...display, fontSize: 170, transform: `scale(${s1})`, opacity: s1}}>
        Estudia
        <br />
        <span style={{color: colors.cyan}}>inteligente,</span>
      </div>
      <div style={{height: 30}} />
      <div
        style={{
          ...display,
          fontSize: 118,
          transform: `scale(${s2})`,
          opacity: s2,
          color: colors.amber,
        }}
      >
        piensa por ti mismo
      </div>
      <div style={{height: 60}} />
      <Pop delay={34}>
        <div style={{...body, fontSize: 46, color: colors.muted, fontWeight: 600}}>
          Cómo aprovechar la Inteligencia Artificial sin dejar de aprender
        </div>
      </Pop>
    </Scene>
  );
};

// 3. Contexto + riesgo
export const ProblemScene: React.FC<{duration: number}> = ({duration}) => {
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <div style={{...body, fontSize: 62, fontWeight: 600}}>
          La IA está cambiando la manera de{' '}
          <span style={{color: colors.cyan}}>estudiar, investigar</span> y hacer trabajos
          universitarios.
        </div>
      </Pop>
      <div style={{height: 90}} />
      <Pop delay={45}>
        <Tag color={colors.danger}>El riesgo</Tag>
      </Pop>
      <div style={{height: 40}} />
      <Pop delay={55}>
        <div style={{...display, fontSize: 104}}>
          <Marker delay={75} color={colors.danger}>
            depender
          </Marker>{' '}
          de ella sin desarrollar tu propio razonamiento
        </div>
      </Pop>
    </Scene>
  );
};

// 4. Tesis
export const ThesisScene: React.FC<{duration: number}> = ({duration}) => {
  return (
    <Scene duration={duration}>
      <WordReveal
        text="La IA puede ser un extraordinario compañero de aprendizaje"
        stagger={4}
        style={{...display, fontSize: 118}}
        highlight={{extraordinario: colors.cyan, compañero: colors.cyan}}
      />
      <div style={{height: 70}} />
      <Pop delay={45}>
        <div style={{...body, fontSize: 54, fontWeight: 600, color: colors.muted}}>
          …siempre que <span style={{color: colors.amber}}>no sustituya</span> tu pensamiento.
        </div>
      </Pop>
    </Scene>
  );
};

const BENEFITS = [
  'Comprender temas complejos y estudiar mejor',
  'Investigar, analizar documentos y contrastar información',
  'Desarrollar trabajos académicos sin renunciar al pensamiento propio',
  'Crear presentaciones, imágenes, videos y materiales educativos',
  'Preparar exámenes y usar la IA como tutor personalizado',
  'Identificar errores, información inventada y respuestas incorrectas',
];

// 5. Lo que aprenderán
export const BenefitsScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Reparte los 6 puntos a lo largo de la escena (que crece con la voz en off).
  const step = Math.min(45, Math.max(26, Math.floor((duration - 60) / BENEFITS.length)));
  return (
    <Scene duration={duration} style={{alignItems: 'stretch'}}>
      <Pop delay={0}>
        <div style={{...display, fontSize: 96, marginBottom: 50}}>
          Con ejemplos y <span style={{color: colors.cyan}}>ejercicios prácticos</span>
        </div>
      </Pop>
      {BENEFITS.map((b, i) => {
        const s = spring({frame: frame - 20 - i * step, fps, config: {damping: 14}});
        const active = frame >= 20 + i * step && frame < 20 + (i + 1) * step + 10;
        return (
          <div
            key={b}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 30,
              marginBottom: 26,
              opacity: s,
              transform: `translateX(${(1 - s) * -120}px)`,
              background: active ? 'rgba(60,231,255,0.12)' : 'rgba(255,255,255,0.05)',
              border: `2px solid ${active ? colors.cyan : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 26,
              padding: '24px 30px',
            }}
          >
            <div
              style={{
                fontFamily: fonts.display,
                fontSize: 58,
                color: colors.bg,
                background: i % 2 === 0 ? colors.cyan : colors.amber,
                borderRadius: 18,
                minWidth: 96,
                height: 96,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{...body, textAlign: 'left', fontSize: 40, fontWeight: 600}}>{b}</div>
          </div>
        );
      })}
    </Scene>
  );
};

// 6. El reto
export const ChallengeScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [70, 85], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <Tag color={colors.amber}>El reto</Tag>
      </Pop>
      <div style={{height: 60}} />
      <Pop delay={8}>
        <div style={{...display, fontSize: 100}}>
          Usar la IA para{' '}
          <span style={{color: colors.cyan}}>cuestionar, investigar</span> y{' '}
          <span style={{color: colors.amber}}>fortalecer tus ideas</span>
        </div>
      </Pop>
      <div style={{height: 80}} />
      <Pop delay={50}>
        <div style={{...body, fontSize: 52, fontWeight: 600, color: colors.muted, position: 'relative'}}>
          no para que piense por ti
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '52%',
              height: 7,
              width: `${strike}%`,
              background: colors.danger,
              borderRadius: 4,
            }}
          />
        </div>
      </Pop>
    </Scene>
  );
};

// 7. Mensaje central
export const MessageScene: React.FC<{duration: number}> = ({duration}) => {
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <div style={{...display, fontSize: 210, color: colors.cyan, lineHeight: 0.6, height: 110}}>
          “
        </div>
      </Pop>
      <WordReveal
        text="Que la IA te ayude a ser mejor estudiante,"
        delay={6}
        stagger={4}
        style={{...display, fontSize: 112}}
        highlight={{mejor: colors.cyan, estudiante: colors.cyan}}
      />
      <div style={{height: 40}} />
      <WordReveal
        text="no que se convierta en el estudiante por ti."
        delay={50}
        stagger={4}
        style={{...display, fontSize: 92, color: colors.muted}}
        highlight={{ti: colors.amber}}
      />
    </Scene>
  );
};

// 8. Cierre: ponente + datos + CTA
export const OutroScene: React.FC<{duration: number}> = ({duration}) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 6) * 0.025;
  const chip: React.CSSProperties = {
    ...body,
    fontSize: 38,
    fontWeight: 600,
    background: 'rgba(255,255,255,0.07)',
    border: '2px solid rgba(255,255,255,0.15)',
    borderRadius: 999,
    padding: '16px 34px',
  };
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <div style={{...body, fontSize: 40, letterSpacing: 8, color: colors.muted, fontWeight: 800}}>
          IMPARTE
        </div>
      </Pop>
      <Pop delay={6}>
        <div style={{...display, fontSize: 148, marginTop: 10}}>
          Jorge <span style={{color: colors.cyan}}>Ramos</span>
        </div>
      </Pop>
      <Pop delay={14}>
        <div style={{...body, fontSize: 44, fontWeight: 600, color: colors.amber, marginTop: 10}}>
          Conferencista y Consultor en Inteligencia Artificial
        </div>
      </Pop>
      <div style={{height: 70}} />
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center'}}>
        <Pop delay={26}>
          <div style={chip}>Conferencia – Workshop</div>
        </Pop>
        <Pop delay={32}>
          <div style={chip}>3 horas</div>
        </Pop>
        <Pop delay={38}>
          <div style={chip}>Universitarios de todas las carreras</div>
        </Pop>
      </div>
      <div style={{height: 90}} />
      <Pop delay={55}>
        <div
          style={{
            ...display,
            fontSize: 74,
            color: colors.bg,
            background: `linear-gradient(90deg, ${colors.cyan}, ${colors.amber})`,
            borderRadius: 28,
            padding: '30px 50px',
            transform: `scale(${frame > 70 ? pulse : 1})`,
            boxShadow: '0 20px 60px rgba(60,231,255,0.35)',
          }}
        >
          Lleva este workshop a tu universidad
        </div>
      </Pop>
      <Pop delay={70}>
        <div style={{...body, fontSize: 42, fontWeight: 600, marginTop: 40}}>
          Escríbenos por mensaje directo
        </div>
      </Pop>
    </Scene>
  );
};
