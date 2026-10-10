import React, {createContext, useContext} from 'react';
import '@fontsource/anton/400.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/800.css';
import '@fontsource/fraunces/800.css';
import '@fontsource/fraunces/800-italic.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/800.css';

export type Theme = {
  bg: string;
  bg2: string;
  text: string;
  muted: string;
  primary: string;
  secondary: string;
  danger: string;
  // Texto sobre el botón de llamada a la acción.
  onAccent: string;
  cardBg: string;
  cardBorder: string;
  cardActiveBg: string;
  chipBg: string;
  displayFont: string;
  bodyFont: string;
  displayWeight: number;
  uppercase: boolean;
  // Escala de los titulares (las tipografías anchas necesitan menos tamaño).
  displayScale: number;
  background: 'grid' | 'paper';
};

// Reel "Estudia inteligente": noche, neón cian y ámbar, Anton en mayúsculas.
export const NOCTURNO: Theme = {
  bg: '#07091A',
  bg2: '#111640',
  text: '#F4F6FF',
  muted: '#A9B1D6',
  primary: '#3CE7FF',
  secondary: '#FFC94A',
  danger: '#FF5C7A',
  onAccent: '#07091A',
  cardBg: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.1)',
  cardActiveBg: 'rgba(60,231,255,0.12)',
  chipBg: 'rgba(255,255,255,0.07)',
  displayFont: 'Anton, Impact, sans-serif',
  bodyFont: 'Inter, Helvetica, Arial, sans-serif',
  displayWeight: 400,
  uppercase: true,
  displayScale: 1,
  background: 'grid',
};

// Reel "Educar en la era de la IA": papel cálido, tinta azul, coral y verde, serif editorial.
export const PAPEL: Theme = {
  bg: '#FBF3E6',
  bg2: '#FFFAF2',
  text: '#1D2547',
  muted: '#5D6385',
  primary: '#E8553A',
  secondary: '#138A72',
  danger: '#C8283F',
  onAccent: '#FFFFFF',
  cardBg: 'rgba(255,255,255,0.75)',
  cardBorder: 'rgba(29,37,71,0.12)',
  cardActiveBg: '#FFFFFF',
  chipBg: 'rgba(255,255,255,0.8)',
  displayFont: 'Fraunces, Georgia, serif',
  bodyFont: 'Nunito, Helvetica, Arial, sans-serif',
  displayWeight: 800,
  uppercase: false,
  displayScale: 0.86,
  background: 'paper',
};

export const ThemeContext = createContext<Theme>(NOCTURNO);
export const useTheme = () => useContext(ThemeContext);

// Estilos base de titulares y texto corrido para el tema activo.
export const useText = () => {
  const t = useTheme();
  const display: React.CSSProperties = {
    fontFamily: t.displayFont,
    fontWeight: t.displayWeight,
    color: t.text,
    textTransform: t.uppercase ? 'uppercase' : 'none',
    textAlign: 'center',
    lineHeight: t.uppercase ? 1.02 : 1.05,
    letterSpacing: t.uppercase ? 0 : '-0.02em',
  };
  const body: React.CSSProperties = {
    fontFamily: t.bodyFont,
    color: t.text,
    textAlign: 'center',
    lineHeight: 1.3,
  };
  // Tamaño de titular ajustado a la tipografía del tema.
  const ds = (px: number) => Math.round(px * t.displayScale);
  return {t, display, body, ds};
};
