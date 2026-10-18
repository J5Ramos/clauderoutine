# Reel de referencia: "Structure" (desglose para Remotion)

- **Formato:** vertical 9:16, 720×1280 (renderizar en 1080×1920), 30 fps, 18.7 s (≈561 frames)
- **Transcripción:** Whisper (`whisper.cpp`, modelo `ggml-base.en`) → `transcript.srt` (frases), `words.json` (tiempos por palabra en ms)
- **Contact sheet:** `contact-sheet.jpg` (2 fps, se lee de izquierda a derecha y de arriba abajo; cada fila = 3 s)

## Guion (estructura retórica)

| # | Tiempo | Frase | Función |
|---|--------|-------|---------|
| 1 | 0.0–2.0 | "Your content is **invisible**" | Gancho: dolor |
| 2 | 2.0–4.0 | "and it's not an editing problem" | Descartar la causa obvia |
| 3 | 4.0–5.7 | "it's a **structure** problem" | Reencuadre (la tesis) |
| 4 | 6.4–9.9 | "If your script is **weak**, motion design is **useless**" | Argumento 1 |
| 5 | 9.9–11.9 | "**Overediting** hides the problem" | Argumento 2 |
| 6 | 12.8–13.9 | "**Structure** solves it" | Solución |
| 7 | 13.9–18.7 | "Want my script framework? Comment **structure**" | CTA con palabra clave |

**Plantilla reutilizable:** `[Dolor] → No es [causa obvia] → Es [causa real] → Si [X] falla, [Y] no sirve → [Error común] lo oculta → [Causa real] lo resuelve → ¿Quieres mi [recurso]? Comenta "[PALABRA]"`

## Escenas (visual)

Todos los cortes duros detectados por ffmpeg caen en **12.8 s** y **14.83 s**; el resto son transiciones animadas (morph, motion blur, push-in).

| # | Frames (30 fps) | Objeto 3D / prop | Tipografía y animación |
|---|-----------------|------------------|------------------------|
| 1 | 0–60 | Lentes que entran girando y rebotan | "Your / content / is" aparece palabra por palabra en sans; fondo de papel con croquis técnico y "#" grandes |
| 2 | 45–105 | Los lentes se quedan | **INVISIBLE**: condensada gigante, línea roja de glitch que la cruza, sale empujada a la izquierda |
| 3 | 105–120 | Ídem | "not an Editing problem" + bloque pequeño tipo definición de diccionario ("Video Editing – …") |
| 4 | 120–171 | Columna griega (capitel jónico) | Etiqueta negra "It's a" → "Structure / Problem" con letras que se reensamblan; esquinas de encuadre; texto de definición |
| 5 | 180–270 | Libreta con chinchetas + pluma | "if your script is" en serif itálica tipo manuscrita; **Weak** con círculo rojo dibujado (stroke animado); "MOTION DESIGN" condensada abajo |
| 6 | 270–300 | Hoja arrancada | **USELESS** en rojo con smear de motion blur vertical |
| 7 | 300–360 | Muro de ladrillos + lupa | **OVEREDITING** rojo; la lupa entra y dentro revela "hides the Problem" |
| 8 | 360–384 | — | Transición con blur direccional |
| 9 | 384–445 | Llave antigua que rota | **STRUCTURE** rojo + "Solves it" serif itálica; la llave hace push-in |
| 10 | 445–561 | Documento "SCRIPT framework" dentro de círculo punteado | "Want my" arriba; píldora con "structure" que se escribe letra por letra (efecto botón/comentario) |

## Sistema visual

- **Fondo:** papel blanco roto `#EEEDEA` con viñeta suave y croquis/planos a baja opacidad
- **Colores:** negro `#111`, rojo vino `#8E1B1B`, grises para sombras
- **Tipos (equivalentes de Google Fonts):** condensada bold → *Anton* / *Bebas Neue*; serif itálica → *Instrument Serif Italic* / *Playfair Display Italic*; sans → *Inter*
- **Props:** objetos fotorrealistas recortados (PNG con alfa) con sombra proyectada; un objeto metafórico por idea (lentes = visibilidad, columna = estructura, lupa = ocultar, llave = solución)
- **Ritmo:** cada palabra clave entra sincronizada con su timestamp de `words.json` (±2 frames); un cambio visual cada 1–2 s; cámara siempre con push-in lento (escala 1.0 → 1.08)

## Mapa a Remotion

- `<Composition id="StructureReel" width={1080} height={1920} fps={30} durationInFrames={561} />`
- Una `<Sequence>` por escena (tabla de arriba); props como `<Img>` con `spring()` para entradas/rebotes
- Palabras clave: `startFrame = Math.round(startMs / 1000 * 30)` desde `words.json`
- Círculo rojo de "Weak": SVG `strokeDashoffset` con `interpolate`
- Motion blur: `@remotion/motion-blur` (`<CameraMotionBlur>`) en transiciones 6 y 8
- Para el nuevo tema: reescribir las 7 frases con la plantilla, volver a generar la voz, pasarla por Whisper y sustituir `words.json`
