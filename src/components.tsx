import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import {colors, fonts} from './theme';

// Fondo animado: degradado, cuadrícula sutil y "orbes" de luz que se mueven lento.
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const orb = (x: number, y: number, size: number, color: string, phase: number) => (
    <div
      style={{
        position: 'absolute',
        left: x + Math.sin(t * 0.5 + phase) * 80,
        top: y + Math.cos(t * 0.4 + phase) * 120,
        width: size,
        height: size,
        borderRadius: '50%',
        background: color,
        filter: 'blur(140px)',
        opacity: 0.35,
      }}
    />
  );
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, ${colors.bg2} 0%, ${colors.bg} 70%)`,
        overflow: 'hidden',
      }}
    >
      {orb(-200, 200, 700, colors.cyan, 0)}
      {orb(600, 1200, 800, '#5B3CFF', 2)}
      {orb(500, -200, 500, colors.amber, 4)}
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

export const Tag: React.FC<{children: React.ReactNode; color?: string}> = ({
  children,
  color = colors.cyan,
}) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontWeight: 800,
      fontSize: 34,
      letterSpacing: 6,
      textTransform: 'uppercase',
      color,
      border: `3px solid ${color}`,
      borderRadius: 999,
      padding: '14px 34px',
      display: 'inline-block',
    }}
  >
    {children}
  </div>
);

// Barra de progreso superior (estilo stories).
export const ProgressBar: React.FC<{total: number}> = ({total}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: 'absolute',
        top: 70,
        left: 90,
        right: 90,
        height: 8,
        borderRadius: 8,
        background: 'rgba(255,255,255,0.15)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${(frame / total) * 100}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${colors.cyan}, ${colors.amber})`,
        }}
      />
    </div>
  );
};
