# Juliweb · Astro + JavaScript vanilla

Copia de la landing suministrada en `reference/elementor-original.json`. HTML estático generado con Astro, CSS local y JavaScript vanilla. No necesita WordPress, Elementor, una base de datos ni servicios externos para mostrar el contenido.

## Desarrollo

Requiere Node.js 24 y npm.

```sh
npm ci
npm run dev
```

Abrir la dirección que imprime Astro. Para generar y revisar el HTML final:

```sh
npm run build
npm run verify
npm run preview
```

El resultado publicable queda en `dist/`. No abrir el archivo Astro directamente ni el HTML compilado mediante `file://`; usar un servidor HTTP.

## Archivos principales

- `src/components/Landing.astro`: contenido de la landing; comentarios identifican los bloques del JSON.
- `src/styles/landing.css`: estilos globales, locales y responsive trasladados del JSON, sin dependencia de Elementor.
- `src/components/ContactForm.astro`: formulario visual con etiquetas y validación nativa.
- `src/scripts/contact.js`: comportamiento provisional del formulario, sin envío ni almacenamiento.
- `src/pages/index.astro`: SEO y estructura del documento.
- `src/data/faq.json`: preguntas y respuestas para los datos estructurados. Mantener sincronizado con el texto visible.
- `public/images/`: logo y fotografía originales descargados, sin enlaces a WordPress.
- `src/assets/`: tipografía Plus Jakarta Sans autoalojada. Licencia en `public/fonts-LICENSE.txt`.
- `reference/`: exportación original e informe de conversión.

## Subir a GitHub

Subir el contenido de esta carpeta como raíz del repositorio, incluidos los archivos ocultos `.github/`, `.gitignore`, `.nvmrc` y `.env.example`. No subir `node_modules/`, `.astro/` ni `.env`.

```sh
git init
git add .
git commit -m "Landing Juliweb en Astro"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

El repositorio de GitHub debe existir; sustituir los valores de ejemplo.

## Publicación

### Dominio propio o hosting estático

Valores por defecto: `SITE_URL=https://juliweb.net.ar`, `BASE_PATH=/`. Compilar y subir **el contenido de `dist/`** a la raíz del hosting. Astro no requiere Node.js en el servidor de producción.

Para otro dominio, definir `SITE_URL` al compilar. No modificar DNS hasta haber decidido reemplazar WordPress. No se cambió el sitio actual durante esta conversión.

### GitHub Pages

El workflow `.github/workflows/deploy.yml` compila, verifica y despliega con cada push a `main`.

1. En GitHub → Settings → Pages, elegir **GitHub Actions** como Source.
2. En Settings → Secrets and variables → Actions → Variables, configurar:
   - Con dominio propio: `SITE_URL=https://juliweb.net.ar` y `BASE_PATH=/`.
   - Con URL de proyecto: `SITE_URL=https://TU-USUARIO.github.io` y `BASE_PATH=/TU-REPOSITORIO/`.
3. Hacer push o ejecutar el workflow manualmente.
4. Para dominio propio, configurarlo en Pages y completar su DNS. No se incluye un `CNAME` que cambie un dominio sin autorización.

Las rutas de imagen se construyen con `import.meta.env.BASE_URL`, por lo que también funcionan bajo `/TU-REPOSITORIO/`. La fuente se resuelve desde el CSS con una URL relativa y Astro emite su archivo con hash. La foto es un `<img>` semántico con `width`, `height`, `alt` y `object-fit`/transformación CSS; no es un fondo dependiente de una URL de WordPress. No cambiar estos enlaces por rutas de Windows como `D:/Descargas/...`.

Documentación: https://docs.astro.build/en/guides/deploy/github/

## SEO on page

Incluye idioma `es-AR`, título, descripción, URL canónica, Open Graph, Twitter Card, favicon local, un único H1, encabezados H2/H3, textos alternativos, sitemap, robots.txt y JSON-LD de WebSite, WebPage, Person y FAQPage. El copy visible conserva el JSON. La configuración no promete posiciones en buscadores.

Revisar `SITE_URL` antes de publicar: determina la canónica, la imagen social absoluta y el sitemap. Al migrar efectivamente desde WordPress, preservar las URLs antiguas relevantes mediante redirecciones en el hosting; esta entrega reproduce la portada, no todo el sitio WordPress.

## Formulario · segunda etapa

Los campos y el botón están reproducidos, con validación HTML. En esta etapa **no se envían correos**. Una vez completados los campos, el botón muestra un aviso honesto de que el envío todavía no está disponible. No transmite ni guarda datos. Sin JavaScript, el botón queda deshabilitado para evitar envíos accidentales.

En la segunda etapa se puede conectar Resend desde un endpoint server-side o función serverless. Una clave de Resend nunca debe ir en JavaScript público, variables `PUBLIC_*` ni en el repositorio. GitHub Pages solo aloja archivos estáticos, por lo que el envío necesita un endpoint externo. No se ha agregado ninguna clave ni dependencia de Resend.

## Diseño y fidelidad

Se trasladaron los estilos incluidos en el JSON, incluidos los cambios de móvil, el recorte y filtro de la foto, la barra de servicios sin guiones y los iconos SVG. La barra conserva su pausa al pasar el cursor y la alternativa estática para usuarios que solicitan reducir movimiento. El export de JetFormBuilder contiene la referencia al formulario, no su plantilla de campos; estos se reconstruyeron a partir de la landing conocida. No se incluyen reCAPTCHA ni analítica de WordPress en esta primera etapa.


## Refinamiento editorial
La segunda versión conserva los 71 bloques de copy del JSON. Los cambios visuales están en src/styles/editorial.css: Lora local para titulares, fotografía a color moderado, retrato junto al mensaje, resultados en una composición editorial y espaciado más compacto en móvil. Los estilos HTML originales se extrajeron a src/styles/embedded.css para controlar la cascada. No se agregaron casos, afirmaciones ni testimonios. WordPress sigue separado de este proyecto.

