# Reel – "Estudia inteligente, piensa por ti mismo"

Reel vertical (1080×1920, 30 fps, ~41 s) hecho con [Remotion](https://www.remotion.dev/) para dar a conocer la conferencia‑workshop de Jorge Ramos. Sin fecha ni precio: es el primer contacto, su objetivo es que una universidad quiera contratarlo.

El video ya renderizado está en `renders/estudia-inteligente-reel.mp4`.

## Guion por escenas

| # | Escena | Texto principal |
|---|--------|-----------------|
| 1 | Gancho | ¿Y si la IA está pensando por ti? |
| 2 | Título | Estudia inteligente, piensa por ti mismo |
| 3 | Contexto y riesgo | La IA cambia cómo estudiamos… el riesgo: depender de ella |
| 4 | Tesis | La IA puede ser un extraordinario compañero de aprendizaje |
| 5 | Qué aprenderás | Los 6 usos prácticos de la IA |
| 6 | El reto | Cuestionar, investigar y fortalecer tus ideas |
| 7 | Mensaje central | Que la IA te ayude a ser mejor estudiante… |
| 8 | Cierre / CTA | Imparte Jorge Ramos · 3 h · "Lleva este workshop a tu universidad" |

Los textos están en `src/scenes.tsx`; las duraciones de cada escena en `src/WorkshopReel.tsx`; colores y tipografías en `src/theme.ts`.

## Uso

```bash
npm install
npm run dev      # Remotion Studio para previsualizar y editar
npm run render   # genera out/estudia-inteligente-reel.mp4
```

El video no lleva audio: añade música o voz en off en tu editor o en la app de Instagram/TikTok.
