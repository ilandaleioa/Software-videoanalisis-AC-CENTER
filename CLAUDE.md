# CLAUDE.md · Herramienta de videoanálisis AC Center (Lezama Talks)

Instrucciones para Claude (o cualquier asistente) que trabaje en este repositorio.
Autor de la herramienta: **Ibon Landa**. Marca y publicación: **Athletic Club Football Center (ACFC)**.

---

## 1. Qué es y dónde se publica

Es una herramienta de videoanálisis en **un único HTML autocontenido**: registro de acciones, clips, listas de reproducción, editor de vídeo e importación desde Excel, Google Sheets e imagen.

| Dónde | URL | Qué publica |
|---|---|---|
| GitHub Pages | https://ilandaleioa.github.io/Software-videoanalisis-AC-CENTER/ | `index.html` de la rama `gh-pages` |
| Dominio ACFC | https://acfootballcenter.eus/lezama-talks/videoanalisis/ | **El mismo** `index.html` de `gh-pages`, copiado por el servidor cada 10 minutos |

**Regla clave:** lo que se publica en `gh-pages/index.html` aparece solo en el dominio de ACFC en un máximo de 10 minutos. No hay que hacer nada más.

⚠️ **Salvaguarda:** el servidor de ACFC **solo publica** el `index.html` si contiene el texto `capa ACFC` (el comentario que cierra el bloque de estilos de marca). Si ese bloque desaparece, el dominio se queda con la última versión válida y registra un aviso. Nunca borres ese bloque.

## 2. Ramas y flujo de trabajo

- `main`: código fuente. El archivo es `Herramienta videoanalis AC Center.html`.
- Ramas de funcionalidad (p. ej. `barra-reproductor`): se trabajan aparte y se fusionan en `main`.
- `gh-pages`: publicación. Contiene `index.html`, que es **una copia exacta** del archivo de `main`, y `.nojekyll`.

Para publicar un cambio:

```bash
# 1. Trabajar y confirmar en main (o en una rama que luego se fusiona en main)
git checkout main
# ... cambios ...
git commit -am "Describe el cambio"
git push origin main

# 2. Copiar a gh-pages como index.html
git checkout gh-pages
git checkout main -- "Herramienta videoanalis AC Center.html"
mv -f "Herramienta videoanalis AC Center.html" index.html
git add index.html
git commit -m "Publica: describe el cambio"
git push origin gh-pages
git checkout main
```

Antes de publicar, comprueba que `index.html` contiene `capa ACFC`:

```bash
grep -c "capa ACFC" index.html   # debe devolver 1 o más
```

## 3. Branding ACFC: qué NO se toca

El diseño replica la línea visual de https://acfootballcenter.eus/ia-aplicada-gestion-deportiva/. Todo el branding es **solo HTML y CSS**. El JavaScript de la herramienta no depende de él.

Estas partes del HTML son de ACFC. Consérvalas al editar:

1. **Tokens de color** en `:root` (al principio del `<style>`), con los mismos nombres de siempre (`--bg`, `--panel`, `--ink`, `--muted`, `--line`, `--red`) y valores ACFC, más estos:
   - `--red-2` (rojo hover), `--f-disp` (tipografía de títulos) y `--f-body` (tipografía de texto).
2. **Bloque `ACFC · CAPA VISUAL`** al final del `<style>`, desde `/* ===== ACFC · CAPA VISUAL ...` hasta `/* ===== fin capa ACFC ===== */`. Incluye las `@font-face` de DIN PRO, la cabecera oscura, los botones rectos, los paneles y el pie.
3. **Barra superior** `<div class="acfcUtil">`, justo después de `<body>`.
4. **Logo y título** dentro de `<header>`: `<h1 class="acfcBrand">…</h1>`.
5. **Pie con promoción de cursos** `<footer class="acfcFoot">`, justo antes del primer `<dialog>`.

Todas las clases de marca empiezan por `acfc`. No reutilices ese prefijo para la herramienta.

### Compatibilidad con el JS (importante)
- El JS usa `document.querySelector(".stage")` (el **primer** `.stage` debe ser el visor) y `document.querySelector('label[for="file"]')` (el **primer** label debe ser el botón «Cargar vídeo» de la cabecera). No añadas elementos con clase `stage` ni `label[for="file"]` antes de esos.
- La barra superior y el pie no tienen `id`, así que no chocan con `$()`.

## 4. Guía de estilo para funcionalidades nuevas

Cuando añadas interfaz nueva, usa lo que ya existe y **no metas colores ni fuentes a mano**:

- **Colores:** `var(--red)` para la acción principal y los acentos, `var(--ink)` para el texto, `var(--muted)` para el texto secundario, `var(--line)` para los bordes y `var(--bg)`/`var(--panel)` para los fondos. Así el modo oscuro funciona solo.
- **Categorías de eventos:** siguen con sus colores propios (`--c-gol`, `--c-oca`…). Son funcionales, no de marca.
- **Tipografía:** `font-family:var(--f-disp)` para títulos y cifras, `var(--f-body)` para el texto. No escribas `"Barlow Condensed"` ni `Barlow` directamente. DIN PRO se carga desde el servidor de ACFC y Barlow queda como respaldo.
  - **No subas los archivos de la fuente DIN PRO al repo**: tiene licencia comercial.
- **Botones:** `class="btn"` (secundario) o `class="btn primary"` (acción principal: rojo, mayúsculas, cantos rectos). Sin `border-radius`.
- **Títulos de panel o diálogo:** `<h2>` en mayúsculas. En `aside` ya llevan el cuadradito rojo delante.
- **Cantos:** rectos (`border-radius:0`). Como mucho `2px` en chips o etiquetas pequeñas.
- **Paneles:** fondo `var(--panel)`, borde `1px solid var(--line)` y, si quieres resaltarlo, `border-top:3px solid var(--ink)`.
- **Iconos:** se mantienen los emojis actuales. No añadas librerías de iconos.
- **Móvil:** comprueba a 390 px de ancho que nada se desborde en horizontal.

## 5. Promoción de cursos: cómo actualizarla

Cada edición cambian las fechas. Se editan en **dos sitios** del HTML (busca `ACFC ·` en los comentarios):

- `<!-- ACFC · barra superior ... -->`: dos enlaces cortos, «Análisis de partido en directo · 20 oct» e «IA aplicada a la gestión · 3 nov».
- `<!-- ACFC · promoción de cursos ... -->`: dos tarjetas (etiqueta, título, modalidad y horas, fechas, frase y botón) y tres enlaces pequeños.

Los datos y las imágenes salen de https://acfootballcenter.eus/ (las imágenes se enlazan desde `wp-content/uploads`, no se copian al repo).
Los enlaces llevan parámetros `utm_source=lezama-talks&utm_medium=herramienta-videoanalisis&utm_campaign=promo-cursos` para medir las visitas. Mantenlos al cambiar la URL.

Si Aritz (ACFC) pide cambiar los cursos promocionados, cambia solo estos bloques.

## 6. Lista de comprobación antes de publicar

- [ ] La funcionalidad nueva funciona en Chrome y Edge, con vídeo cargado.
- [ ] La consola no muestra errores de JavaScript.
- [ ] Siguen presentes el bloque `capa ACFC`, la barra `acfcUtil`, la cabecera `acfcBrand` y el pie `acfcFoot`.
- [ ] Se ve bien en modo claro y oscuro (`prefers-color-scheme`).
- [ ] `index.html` de `gh-pages` es idéntico al archivo de `main`.

## 7. Servidor ACFC (solo informativo)

En el hosting de acfootballcenter.eus (cPanel) hay un cron que ejecuta `~/bin/sync-videoanalisis.sh` cada 10 minutos. El script:

1. Hace `git fetch` de la rama `gh-pages` de este repo.
2. Si hay un commit nuevo y contiene `capa ACFC`, lo copia a `public_html/lezama-talks/videoanalisis/`.
3. Deja un registro en `~/logs/videoanalisis-sync.log`.

Desde el repo no hace falta tocar nada del servidor.

---

## 8. Interfaz v2 (ACFC)

- El bloque CSS "ACFC · INTERFAZ v2" va siempre al final del `<style>` y el script "ACFC · CAPA DE INTERFAZ v2" al final del `<body>`. No se borran ni se mueven.
- Sin emojis en botones: el script los retira solo. Colores: rojo = acción principal; tinta = añadir y descargar; contorno = secundarias; texto subrayado = mostrar/ocultar y acciones menores. Sin rosa, azul, morado ni turquesa.
- Todo control nuevo debe verse bien en móvil vertical (≤640 px) y en el modo inmersivo (clase `html.acfc-imm`). Si un botón nuevo es imprescindible en apaisado, añádelo a las reglas de `html.acfc-imm`.
- Las clases e ids que empiezan por `acfc` son de la capa de ACFC.

---

## 9. Pintado de acciones (dibujo sobre el vídeo)

- Apartado «Pintado de acciones» al final de la columna derecha del registro (`#pintBlock`), con botón **Ocultar/Mostrar** (recuerda el estado en `localStorage`).
- Motor portado del proyecto «Pintado de acciones» (formas, mover/redimensionar, foco con seguimiento). El CSS va justo antes del bloque «INTERFAZ v2» y el `<script>` justo antes de «CAPA DE INTERFAZ v2».
- Todo el DOM propio lleva el prefijo `pint`. Los ids `strokeColor`, `fillColor`, `lineWidth`, `sizeControl`, `sizeValue`, `opacityControl`, `opacityValue`, `focusFollowKeyframe` y `focusFollowEnd` los usa el motor; no los reutilices.
- Las anotaciones se guardan en un espacio lógico de 1280 px de ancho y se escalan al vídeo. Cada elemento nuevo aparece en el instante en que se pinta y dura lo que marca «Visible durante».
- Las anotaciones se guardan solas en el navegador (localStorage, clave `acfcPint:<nombre del vídeo>`) y viajan en el proyecto exportado (campo `pintado`). API: `window.acfcPint.get()` y `.set(lista)`.
- El motor es la función `acfcPintMount(cfg)` y se monta dos veces: en el registro (`#pintBlock`, sufijo de ids vacío, `window.acfcPint`) y en el editor de vídeo (copia del panel con ids terminados en `Ed`, `window.acfcPintEd`, clave `acfcPintEd:<nombre del vídeo>`). Cualquier cambio del motor o del panel vale para los dos.
- En el editor, el pintado no se incluye todavía en los vídeos exportados (solo en el PNG del fotograma).
