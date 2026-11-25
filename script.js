/* =========================================================
   Portafolio personal - script.js
   - Datos de proyectos (edítalos aquí)
   - Render de tarjetas y diálogo de detalles
   - Menú móvil, enlace activo, animaciones de entrada
   ========================================================= */

/* ---------- 1. Datos de proyectos ----------
   Cada proyecto tiene:
   - name, area, summary: textos de la tarjeta
   - description, role, activities, tech: contenido del detalle
   - evidence: lista de capturas reales (src = ruta de la imagen, caption = descripción)
   - cover: imagen de la tarjeta y de la parte superior del detalle
   - repoUrl (opcional): enlace al repositorio de GitHub; repoNote: aclaración de participación
   - pendingNote (opcional): nota que aparece en la sección de evidencias
   Los textos que empiezan con "Pendiente" se muestran como campos por completar.
*/
const PLACEHOLDER_IMG = "assets/placeholder.svg";

/* Enlaces de repositorio: reemplaza el texto entre comillas por tu enlace de GitHub,
   por ejemplo "https://github.com/tu-usuario/vitalmind-plus".
   Mientras siga el texto de ejemplo, el botón "Ver repositorio" aparece deshabilitado. */
const REPO_VITALMIND = "[AQUÍ AGREGARÉ EL ENLACE]";
const REPO_MEDALERT = "[AQUÍ AGREGARÉ EL ENLACE]";

const projects = [
  {
    name: "Mare Pacífico",
    area: "Actualización y migración de contenido web",
    summary: "Actualización de un sitio que estaba en Wix, con su contenido trasladado a una nueva versión en WordPress.",
    cover: "assets/mare-pacifico/01.png",
    description:
      "Se trabajó en la actualización de un sitio web que anteriormente se encontraba en Wix, trasladando su contenido y materiales a una nueva versión desarrollada en WordPress.",
    role:
      "Participé como parte del equipo incorporando información, logos e iconos, y apoyando en la organización del contenido. La migración técnica y el desarrollo de la nueva versión fueron trabajo del equipo.",
    activities: [
      "Incorporar información proporcionada mediante documentos PDF.",
      "Integrar logos e iconos proporcionados.",
      "Acomodar textos y elementos visuales.",
      "Apoyar en la organización del contenido de la nueva página.",
    ],
    tech: ["WordPress"],
    // Agrega o quita líneas según tus capturas. Nombres: 01.png, 02.png, 03.png...
    evidence: [
      { src: "assets/mare-pacifico/01.png", caption: "Evidencia 1: describe aquí la captura" },
      { src: "assets/mare-pacifico/02.png", caption: "Evidencia 2: describe aquí la captura" },
      { src: "assets/mare-pacifico/03.png", caption: "Evidencia 3: describe aquí la captura" },
    ],
  },
  {
    name: "Dolcemondo",
    area: "Personalización de sitio web",
    summary: "Personalización de un sitio con tema de WordPress ya instalado, usando Avada para organizar el contenido.",
    cover: "assets/dolcemondo/01.png",
    description:
      "Trabajé en la personalización de un sitio web que ya contaba con un tema instalado en WordPress. Utilicé Avada para incorporar y organizar contenido dentro de la estructura existente.",
    role:
      "Me encargué de ajustes de contenido y diseño dentro de la estructura ya existente. No desarrollé el tema desde cero ni completé todos los elementos del sitio.",
    activities: [
      "Incorporar información.",
      "Acomodar iconos.",
      "Colocar imágenes.",
      "Organizar textos.",
      "Ajustar elementos visuales dentro del sitio.",
      "Identificar elementos pendientes de ajuste, como el carrusel de residencias.",
    ],
    tech: ["WordPress", "Avada"],
    // Agrega o quita líneas según tus capturas. Nombres: 01.png, 02.png, 03.png...
    evidence: [
      { src: "assets/dolcemondo/01.png", caption: "Evidencia 1: describe aquí la captura" },
      { src: "assets/dolcemondo/02.png", caption: "Evidencia 2: describe aquí la captura" },
      { src: "assets/dolcemondo/03.png", caption: "Evidencia 3: describe aquí la captura" },
    ],
  },
  {
    name: "VitalMind+",
    area: "QA y pruebas de software",
    summary: "Participación en el área de Quality Assurance: pruebas de backend e integración, seguimiento de errores y documentación.",
    cover: "assets/illustrations/vitalmind-qa.svg",
    description:
      "VitalMind+ fue un proyecto de desarrollo de software en el que participé en el área de Quality Assurance (QA), realizando pruebas al sistema y apoyando en la identificación y revisión de errores.",
    role:
      "Me enfoqué en QA, pruebas y documentación de resultados. No participé en el desarrollo completo del sistema.",
    activities: [
      "Pruebas de backend.",
      "Pruebas de integración.",
      "Revisión y seguimiento de errores.",
      "Organización de reportes de pruebas.",
      "Documentación de resultados.",
    ],
    tech: ["Markdown (README.md, RESULT.md)", "Pendiente: herramientas de pruebas"],
    structure: ["fix/api-errors", "test-backend", "test-integration", "vitalmind-api"],
    evidence: [],
    pendingNote:
      "Este proyecto se presenta con una ilustración porque no incluye capturas del sistema. Si más adelante tienes capturas autorizadas, agrégalas en assets/vitalmind-plus/ y en este archivo.",
    repoUrl: "https://github.com/KouDionicio/9A-IDGS-ECBD-VitalMind-.git",
    repoNote:
      "El repositorio corresponde al proyecto completo del equipo. Mi participación se centró en las pruebas de backend e integración, el seguimiento de errores y la documentación de resultados.",
  },
  {
    name: "MedAlert+",
    area: "Backend y base de datos",
    summary: "Proyecto universitario de gestión de recordatorios de medicamentos, con trabajo en backend y base de datos.",
    cover: "assets/illustrations/medalert-backend.svg",
    description:
      "MedAlert+ fue un proyecto universitario enfocado en la gestión de recordatorios de medicamentos.",
    role:
      "Participé en el área de backend y base de datos: trabajo en la base de datos, apoyo en el desarrollo backend y organización de la información del sistema.",
    activities: [
      "Trabajo en la base de datos.",
      "Apoyo en el desarrollo backend.",
      "Organización y gestión de información del sistema.",
    ],
    tech: ["Pendiente: tecnologías utilizadas"],
    evidence: [],
    pendingNote:
      "Sección en preparación: aquí podrás agregar capturas de pantalla, detalles técnicos y más información del proyecto.",
    repoUrl: "https://github.com/yaz-gutzz/MedAlert.git",
    repoNote:
      "El repositorio corresponde al proyecto universitario del equipo. Mi participación se centró en el backend, la base de datos y la organización de la información del sistema.",
  },
];

/* ---------- 2. Referencias al DOM ---------- */
const projectsGrid = document.getElementById("projects-grid");
const dialog = document.getElementById("project-dialog");
const dialogContent = document.getElementById("dialog-content");
const dialogClose = document.getElementById("dialog-close");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

/* ---------- 3. Funciones auxiliares ---------- */

/** Crea un elemento con clase y texto opcionales. */
function createEl(tag, className = "", text = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

/** Crea una lista de "chips" a partir de un arreglo de textos. */
function createChips(items) {
  const list = createEl("ul", "chips");
  items.forEach((item) => {
    const isPending = item.startsWith("Pendiente");
    const chip = createEl("li", isPending ? "chip pending" : "chip", item);
    list.append(chip);
  });
  return list;
}

/** Crea un bloque con título y contenido para el diálogo. */
function createSection(title, content) {
  const section = createEl("section", "dialog-section");
  section.append(createEl("h4", "", title), content);
  return section;
}

/** Acepta solo enlaces reales de GitHub; el texto de ejemplo no se considera válido. */
function isValidRepo(url) {
  return typeof url === "string" && /^https:\/\/github\.com\/.+/.test(url);
}

/** Crea el botón "Ver repositorio". Si el enlace aún no existe, queda deshabilitado. */
function createRepoButton(project, className) {
  const link = createEl("a", className, "Ver repositorio");
  if (isValidRepo(project.repoUrl)) {
    link.href = project.repoUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `Ver repositorio de ${project.name} en GitHub (se abre en otra pestaña)`);
  } else {
    link.href = "#";
    link.classList.add("is-pending");
    link.setAttribute("aria-disabled", "true");
    link.title = "Enlace de repositorio pendiente";
    link.addEventListener("click", (event) => event.preventDefault());
  }
  return link;
}

/* ---------- 4. Render de tarjetas ---------- */
function renderProjects() {
  projects.forEach((project) => {
    const card = createEl("article", "project-card reveal");

    const media = createEl("div", "project-media");
    const img = createEl("img");
    img.src = project.cover;
    img.alt = `Vista previa de ${project.name}`;
    img.loading = "lazy";
    // Si la imagen aún no existe, se muestra el marcador para no dejar un hueco
    img.addEventListener("error", () => {
      if (img.src.endsWith(PLACEHOLDER_IMG)) return;
      img.src = PLACEHOLDER_IMG;
      img.alt = `Imagen pendiente de ${project.name}`;
    });
    media.append(img);

    const body = createEl("div", "project-body");
    body.append(
      createEl("span", "project-area", project.area),
      createEl("h3", "", project.name),
      createEl("p", "", project.summary),
      createChips(project.tech)
    );

    const actions = createEl("div", "project-actions");

    const button = createEl("button", "btn btn-solid project-btn", "Ver detalles");
    button.type = "button";
    button.setAttribute("aria-label", `Ver detalles de ${project.name}`);
    button.addEventListener("click", () => openProject(project));
    actions.append(button);

    if (project.repoUrl !== undefined) {
      actions.append(createRepoButton(project, "btn btn-outline"));
    }
    body.append(actions);

    card.append(media, body);
    projectsGrid.append(card);
  });
}

/* ---------- 5. Diálogo de detalles ---------- */
function openProject(project) {
  dialogContent.replaceChildren();

  // Imagen principal (se oculta si el archivo aún no existe)
  const hero = createEl("img", "dialog-hero");
  hero.src = project.cover;
  hero.alt = `Vista principal de ${project.name}`;
  hero.loading = "lazy";
  hero.addEventListener("error", () => hero.remove());
  dialogContent.append(hero);

  // Encabezado
  const header = createEl("header", "dialog-header");
  header.append(createEl("span", "project-area", project.area), createEl("h3", "", project.name));
  dialogContent.append(header);

  // Descripción
  dialogContent.append(createSection("Descripción", createEl("p", "", project.description)));

  // Mi rol
  dialogContent.append(createSection("Mi rol", createEl("p", "", project.role)));

  // Actividades
  const activitiesList = createEl("ul");
  project.activities.forEach((activity) => activitiesList.append(createEl("li", "", activity)));
  dialogContent.append(createSection("Actividades realizadas", activitiesList));

  // Estructura del proyecto (solo si existe)
  if (project.structure) {
    const structureList = createEl("ul");
    project.structure.forEach((folder) => structureList.append(createEl("li", "", folder)));
    dialogContent.append(createSection("Estructura observada en las evidencias", structureList));
  }

  // Tecnologías
  dialogContent.append(createSection("Tecnologías utilizadas", createChips(project.tech)));

  // Repositorio (solo si el proyecto lo tiene)
  if (project.repoUrl !== undefined) {
    const repoBlock = createEl("div", "repo-block");
    repoBlock.append(createRepoButton(project, "btn btn-solid"));
    if (project.repoNote) {
      repoBlock.append(createEl("p", "repo-note", project.repoNote));
    }
    dialogContent.append(createSection("Repositorio", repoBlock));
  }

  // Evidencias visuales
  const evidenceBlock = createEl("div");
  if (project.evidence.length > 0) {
    const grid = createEl("div", "evidence-grid");
    project.evidence.forEach((item) => {
      const figure = createEl("figure");
      const img = createEl("img");
      img.src = item.src;
      img.alt = item.caption;
      img.loading = "lazy";
      // Si la captura aún no existe, no se muestra nada en su lugar
      img.addEventListener("error", () => figure.remove());

      // Clic en la captura: abre la imagen completa en otra pestaña
      const link = createEl("a", "evidence-link");
      link.href = item.src;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `Abrir imagen completa: ${item.caption}`);
      link.append(img);

      figure.append(link, createEl("figcaption", "", item.caption));
      grid.append(figure);
    });
    evidenceBlock.append(grid);
  }
  if (project.pendingNote) {
    evidenceBlock.append(createEl("p", "pending-note", project.pendingNote));
  }
  dialogContent.append(createSection("Evidencias visuales", evidenceBlock));

  // Abrir el diálogo
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

dialogClose.addEventListener("click", () => dialog.close());

// Cerrar al hacer clic fuera del contenido (sobre el fondo)
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

/* ---------- 6. Menú móvil ---------- */
navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

// Cerrar el menú al elegir una sección
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
  });
});

/* ---------- 7. Enlace activo según la sección visible ---------- */
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

/* ---------- 8. Animaciones de entrada ---------- */
function setupReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

/* ---------- 9. Contacto pendiente ----------
   Mientras un enlace de contacto esté marcado como pendiente,
   evitamos que navegue a "#". */
document.querySelectorAll('.contact-card[aria-disabled="true"]').forEach((card) => {
  card.addEventListener("click", (event) => event.preventDefault());
});

/* ---------- 10. Inicio ---------- */
renderProjects();
setupReveal();
document.getElementById("year").textContent = new Date().getFullYear();