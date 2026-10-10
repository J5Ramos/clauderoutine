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
npm run dev            # Remotion Studio para previsualizar y editar
npm run render         # con voz en off y música -> out/estudia-inteligente-reel.mp4
npm run render:silent  # versión sin audio
```

## Audio

`npm run render` espera estos archivos en `public/audio/`:

- `vo-1.mp3` … `vo-8.mp3`: una toma de voz en off por escena (español de México).
- `music.mp3`: música de fondo instrumental (se mezcla al 16 % y se desvanece al final).

Cada escena dura lo que dura su toma de voz (con un mínimo), así que la voz y el texto siempre quedan sincronizados aunque cambies las tomas.

Guion de la voz en off:

1. ¿Y si la inteligencia artificial... está pensando por ti?
2. Estudia inteligente, piensa por ti mismo. Una conferencia-workshop para universitarios.
3. La IA está cambiando la forma de estudiar e investigar. Pero el riesgo es depender de ella... sin desarrollar tu propio razonamiento.
4. La IA puede ser un extraordinario compañero de aprendizaje... siempre que no sustituya tu pensamiento.
5. Con ejemplos y ejercicios prácticos aprenderás a usarla para comprender temas complejos, investigar y contrastar información, crear presentaciones y materiales, preparar tus exámenes... y detectar cuando la IA se equivoca.
6. El reto: usar la IA para cuestionar, investigar y fortalecer tus ideas... no para que piense por ti.
7. Que la IA te ayude a ser mejor estudiante... no que se convierta en el estudiante por ti.
8. Imparte Jorge Ramos, conferencista y consultor en Inteligencia Artificial. Lleva este workshop a tu universidad. ¡Escríbenos!
