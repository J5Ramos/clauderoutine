import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {useText} from './theme';
import {Marker, Pop, Scene, Tag, WordReveal} from './components';

// 1. Gancho
export const HookScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, body, ds} = useText();
  const frame = useCurrentFrame();
  const shake = frame > 40 && frame < 52 ? Math.sin(frame * 3) * 8 : 0;
  return (
    <Scene duration={duration}>
      <div style={{transform: `translateX(${shake}px)`}}>
        <WordReveal
          text="¿Y si la IA está pensando por ti?"
          stagger={5}
          style={{...display, fontSize: 150}}
          highlight={{ia: t.primary, ti: t.secondary}}
        />
      </div>
    </Scene>
  );
};

// 2. Título
export const TitleScene: React.FC<{duration: number}> = ({duration}) => {
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
      <div style={{...display, fontSize: 170, transform: `scale(${s1})`, opacity: s1}}>
        Estudia
        <br />
        <span style={{color: t.primary}}>inteligente,</span>
      </div>
      <div style={{height: 30}} />
      <div
        style={{
          ...display,
          fontSize: 118,
          transform: `scale(${s2})`,
          opacity: s2,
          color: t.secondary,
        }}
      >
        piensa por ti mismo
      </div>
      <div style={{height: 60}} />
      <Pop delay={34}>
        <div style={{...body, fontSize: 46, color: t.muted, fontWeight: 600}}>
          Cómo aprovechar la Inteligencia Artificial sin dejar de aprender
        </div>
      </Pop>
    </Scene>
  );
};

// 3. Contexto + riesgo
export const ProblemScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, body, ds} = useText();
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <div style={{...body, fontSize: 62, fontWeight: 600}}>
          La IA está cambiando la manera de{' '}
          <span style={{color: t.primary}}>estudiar, investigar</span> y hacer trabajos
          universitarios.
        </div>
      </Pop>
      <div style={{height: 90}} />
      <Pop delay={45}>
        <Tag color={t.danger}>El riesgo</Tag>
      </Pop>
      <div style={{height: 40}} />
      <Pop delay={55}>
        <div style={{...display, fontSize: 104}}>
          <Marker delay={75} color={t.danger}>
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
  const {t, display, body, ds} = useText();
  return (
    <Scene duration={duration}>
      <WordReveal
        text="La IA puede ser un extraordinario compañero de aprendizaje"
        stagger={4}
        style={{...display, fontSize: 118}}
        highlight={{extraordinario: t.primary, compañero: t.primary}}
      />
      <div style={{height: 70}} />
      <Pop delay={45}>
        <div style={{...body, fontSize: 54, fontWeight: 600, color: t.muted}}>
          …siempre que <span style={{color: t.secondary}}>no sustituya</span> tu pensamiento.
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

// Lista numerada que aparece punto por punto.
export const BenefitsList: React.FC<{
  duration: number;
  title: React.ReactNode;
  items: string[];
}> = ({duration, title, items}) => {
  const {t, display, body, ds} = useText();
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Reparte los 6 puntos a lo largo de la escena (que crece con la voz en off).
  const step = Math.min(45, Math.max(26, Math.floor((duration - 60) / items.length)));
  return (
    <Scene duration={duration} style={{alignItems: 'stretch'}}>
      <Pop delay={0}>
        <div style={{...display, fontSize: ds(items.length > 6 ? 84 : 96), marginBottom: items.length > 6 ? 36 : 50}}>
          {title}
        </div>
      </Pop>
      {items.map((b, i) => {
        const s = spring({frame: frame - 20 - i * step, fps, config: {damping: 14}});
        const active = frame >= 20 + i * step && frame < 20 + (i + 1) * step + 10;
        return (
          <div
            key={b}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 30,
              marginBottom: items.length > 6 ? 18 : 26,
              opacity: s,
              transform: `translateX(${(1 - s) * -120}px)`,
              background: active ? t.cardActiveBg : t.cardBg,
              border: `2px solid ${active ? t.primary : t.cardBorder}`,
              boxShadow: active && !t.uppercase ? '0 12px 30px rgba(29,37,71,0.12)' : undefined,
              borderRadius: 26,
              padding: items.length > 6 ? '18px 28px' : '24px 30px',
            }}
          >
            <div
              style={{
                fontFamily: t.displayFont,
                fontWeight: t.displayWeight,
                fontSize: ds(58),
                color: t.onAccent,
                background: i % 2 === 0 ? t.primary : t.secondary,
                borderRadius: 18,
                minWidth: items.length > 6 ? 84 : 96,
                height: items.length > 6 ? 84 : 96,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{...body, textAlign: 'left', fontSize: items.length > 6 ? 37 : 40, fontWeight: 600}}>
              {b}
            </div>
          </div>
        );
      })}
    </Scene>
  );
};

// 5. Lo que aprenderán
export const BenefitsScene: React.FC<{duration: number}> = ({duration}) => {
  const {t} = useText();
  return (
  <BenefitsList
    duration={duration}
    items={BENEFITS}
    title={
      <>
        Con ejemplos y <span style={{color: t.primary}}>ejercicios prácticos</span>
      </>
    }
  />
  );
};

// 6. El reto
export const ChallengeScene: React.FC<{duration: number}> = ({duration}) => {
  const {t, display, body, ds} = useText();
  const frame = useCurrentFrame();
  const strike = interpolate(frame, [70, 85], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <Tag color={t.secondary}>El reto</Tag>
      </Pop>
      <div style={{height: 60}} />
      <Pop delay={8}>
        <div style={{...display, fontSize: 100}}>
          Usar la IA para{' '}
          <span style={{color: t.primary}}>cuestionar, investigar</span> y{' '}
          <span style={{color: t.secondary}}>fortalecer tus ideas</span>
        </div>
      </Pop>
      <div style={{height: 80}} />
      <Pop delay={50}>
        <div style={{...body, fontSize: 52, fontWeight: 600, color: t.muted, position: 'relative'}}>
          no para que piense por ti
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '52%',
              height: 7,
              width: `${strike}%`,
              background: t.danger,
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
  const {t, display, body, ds} = useText();
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <div style={{...display, fontSize: 210, color: t.primary, lineHeight: 0.6, height: 110}}>
          “
        </div>
      </Pop>
      <WordReveal
        text="Que la IA te ayude a ser mejor estudiante,"
        delay={6}
        stagger={4}
        style={{...display, fontSize: 112}}
        highlight={{mejor: t.primary, estudiante: t.primary}}
      />
      <div style={{height: 40}} />
      <WordReveal
        text="no que se convierta en el estudiante por ti."
        delay={50}
        stagger={4}
        style={{...display, fontSize: 92, color: t.muted}}
        highlight={{ti: t.secondary}}
      />
    </Scene>
  );
};

// Cierre: ponente + datos + CTA
export const Outro: React.FC<{duration: number; chips: string[]; cta: string}> = ({
  duration,
  chips,
  cta,
}) => {
  const {t, display, body, ds} = useText();
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 6) * 0.025;
  const chip: React.CSSProperties = {
    ...body,
    fontSize: 38,
    fontWeight: 600,
    background: t.chipBg,
    border: `2px solid ${t.cardBorder}`,
    borderRadius: 999,
    padding: '16px 34px',
  };
  return (
    <Scene duration={duration}>
      <Pop delay={0}>
        <div style={{...body, fontSize: 40, letterSpacing: 8, color: t.muted, fontWeight: 800}}>
          IMPARTE
        </div>
      </Pop>
      <Pop delay={6}>
        <div style={{...display, fontSize: ds(148), marginTop: 10}}>
          Jorge <span style={{color: t.primary}}>Ramos</span>
        </div>
      </Pop>
      <Pop delay={14}>
        <div style={{...body, fontSize: 44, fontWeight: 600, color: t.secondary, marginTop: 10}}>
          Conferencista y Consultor en Inteligencia Artificial
        </div>
      </Pop>
      <div style={{height: 70}} />
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center'}}>
        {chips.map((c, i) => (
          <Pop key={c} delay={26 + i * 6}>
            <div style={chip}>{c}</div>
          </Pop>
        ))}
      </div>
      <div style={{height: 90}} />
      <Pop delay={55}>
        <div
          style={{
            ...display,
            fontSize: ds(74),
            color: t.onAccent,
            background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
            borderRadius: 28,
            padding: '30px 50px',
            transform: `scale(${frame > 70 ? pulse : 1})`,
            boxShadow: `0 20px 60px ${t.primary}59`,
          }}
        >
          {cta}
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

// 8. Cierre
export const OutroScene: React.FC<{duration: number}> = ({duration}) => (
  <Outro
    duration={duration}
    chips={['Conferencia – Workshop', '3 horas', 'Universitarios de todas las carreras']}
    cta="Lleva este workshop a tu universidad"
  />
);
