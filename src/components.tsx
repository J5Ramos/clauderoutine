import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import {useTheme} from './theme';

const Orb: React.FC<{x: number; y: number; size: number; color: string; phase: number; opacity: number; blur: number}> = ({
  x,
  y,
  size,
  color,
  phase,
  opacity,
  blur,
}) => {
  const t = useCurrentFrame() / 30;
  return (
    <div
      style={{
        position: 'absolute',
        left: x + Math.sin(t * 0.5 + phase) * 80,
        top: y + Math.cos(t * 0.4 + phase) * 120,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
      }}
    />
  );
};

// Noche: degradado, cuadrícula que se desplaza y orbes de luz.
const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTheme();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${t.bg2} 0%, ${t.bg} 70%)`,
        overflow: 'hidden',
      }}
    >
      <Orb x={-200} y={200} size={700} color={t.primary} phase={0} opacity={0.35} blur={140} />
      <Orb x={600} y={1200} size={800} color="#5B3CFF" phase={2} opacity={0.35} blur={140} />
      <Orb x={500} y={-200} size={500} color={t.secondary} phase={4} opacity={0.35} blur={140} />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '90px 90px',
          backgroundPosition: `0px ${(frame * 0.6) % 90}px`,
        }}
      />
    </AbsoluteFill>
  );
};

// Papel: hoja de cuaderno con renglones, margen rojo y manchas de color suaves.
const PaperBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const t = useTheme();
  return (
    <AbsoluteFill style={{background: t.bg, overflow: 'hidden'}}>
      <Orb x={-260} y={-120} size={720} color={t.primary} phase={0} opacity={0.18} blur={120} />
      <Orb x={560} y={1300} size={760} color={t.secondary} phase={2} opacity={0.18} blur={120} />
      <Orb x={620} y={300} size={420} color="#F6B93B" phase={4} opacity={0.16} blur={120} />
      <AbsoluteFill
        style={{
          backgroundImage: 'linear-gradient(rgba(29,37,71,0.07) 2px, transparent 2px)',
          backgroundSize: '100% 72px',
          backgroundPosition: `0px ${(frame * 0.4) % 72}px`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 56,
          width: 3,
          background: t.primary,
          opacity: 0.35,
        }}
      />
    </AbsoluteFill>
  );
};

export const Background: React.FC = () => {
  const t = useTheme();
  return t.background === 'paper' ? <PaperBackground /> : <GridBackground />;
};

// Envoltura de escena: fade in/out + leve zoom.
export const Scene: React.FC<{
  duration: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({duration, children, style}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8, duration - 8, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [0, duration], [1, 1.04]);
  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${scale})`,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '260px 90px 340px',
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Entrada con resorte (sube + aparece).
export const Pop: React.FC<{
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  from?: number;
}> = ({delay = 0, children, style, from = 60}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 14, mass: 0.7}});
  return (
    <div
      style={{
        opacity: interpolate(s, [0, 1], [0, 1]),
        transform: `translateY(${interpolate(s, [0, 1], [from, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Texto palabra por palabra.
export const WordReveal: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  highlight?: Record<string, string>;
}> = ({text, delay = 0, stagger = 4, style, highlight = {}}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', ...style}}>
      {words.map((w, i) => {
        const s = spring({frame: frame - delay - i * stagger, fps, config: {damping: 15}});
        const key = w.replace(/[.,¿?¡!]/g, '').toLowerCase();
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              marginRight: '0.28em',
              opacity: s,
              transform: `translateY(${(1 - s) * 40}px) scale(${0.85 + s * 0.15})`,
              color: highlight[key] ?? undefined,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

// Subrayado animado tipo marcador.
export const Marker: React.FC<{
  delay: number;
  color: string;
  children: React.ReactNode;
}> = ({delay, color, children}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 14], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      <span
        style={{
          position: 'absolute',
          left: -8,
          right: -8,
          bottom: '0.08em',
          height: '0.38em',
          background: color,
          opacity: 0.45,
          transformOrigin: 'left',
          transform: `scaleX(${p / 100})`,
          borderRadius: 6,
        }}
      />
      <span style={{position: 'relative'}}>{children}</span>
    </span>
  );
};

// Etiqueta: contorno en el tema nocturno, pastilla rellena en el de papel.
export const Tag: React.FC<{children: React.ReactNode; color?: string}> = ({children, color}) => {
  const t = useTheme();
  const c = color ?? t.primary;
  const filled = t.background === 'paper';
  return (
    <div
      style={{
        fontFamily: t.bodyFont,
        fontWeight: 800,
        fontSize: 34,
        letterSpacing: 6,
        textTransform: 'uppercase',
        color: filled ? t.onAccent : c,
        background: filled ? c : 'transparent',
        border: `3px solid ${c}`,
        borderRadius: filled ? 14 : 999,
        padding: '14px 34px',
        display: 'inline-block',
        transform: filled ? 'rotate(-2deg)' : undefined,
      }}
    >
      {children}
    </div>
  );
};

// Barra de progreso superior (estilo stories).
export const ProgressBar: React.FC<{total: number}> = ({total}) => {
  const frame = useCurrentFrame();
  const t = useTheme();
  const paper = t.background === 'paper';
  return (
    <div
      style={{
        position: 'absolute',
        top: 70,
        left: 90,
        right: 90,
        height: 8,
        borderRadius: 8,
        background: paper ? 'rgba(29,37,71,0.12)' : 'rgba(255,255,255,0.15)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${(frame / total) * 100}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${t.primary}, ${t.secondary})`,
        }}
      />
    </div>
  );
};
