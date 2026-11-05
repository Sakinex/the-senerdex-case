const translations = {
    en: {
        nav_home: "HOME",
        nav_downloads: "DOWNLOADS",
        nav_updates: "UPDATE LOGS",
        nav_cases: "CASE FILES",
        nav_about: "ABOUT",

        classified: "CLASSIFIED INVESTIGATION DATABASE",
        hero_eyebrow: "OFFICIAL GAME WEBSITE",
        hero_description: "Every suspect has a story. Every story has a crack.",
        hero_download: "DOWNLOAD GAME",
        hero_cases: "VIEW CASE FILES",

        downloads_eyebrow: "AVAILABLE FILES",
        downloads_title: "DOWNLOADS",
        download_description: "Download the game package and extract the files before launching it.",
        download_button: "DOWNLOAD GAME",
        download_note: "Make sure you extract the ZIP before opening the launcher.",

        updates_eyebrow: "DEVELOPMENT RECORDS",
        updates_title: "UPDATE LOGS",
        updates_loading: "Loading investigation records...",
        updates_empty: "No update records have been published yet.",
        updates_error: "Unable to load investigation records.",

        cases_eyebrow: "REGISTERED SUBJECTS",
        cases_title: "CASE FILES",
        case_available: "AVAILABLE",
        case_pending: "PENDING",
        case_senerdex: "The first investigation. A suspect, a series of questions, and a truth waiting to be uncovered.",
        case_reler: "Investigation records are being prepared.",
        case_kleb: "Investigation records are being prepared.",
        case_ciberto: "Investigation records are being prepared.",

        about_eyebrow: "DATABASE INFORMATION",
        about_title: "ABOUT THE PROJECT",
        about_description: "CRIME INTERROGE is an interrogation game where players question suspects, investigate their answers, and attempt to uncover the truth.",
        created_by: "CREATED BY",
        footer_text: "OFFICIAL INVESTIGATION DATABASE",

        type_release: "RELEASE",
        type_update: "UPDATE",
        type_hotfix: "HOTFIX",
        type_new: "NEW",
        type_fixed: "FIXED",
        type_improved: "IMPROVED",
        type_removed: "REMOVED"
    },

    es: {
        nav_home: "INICIO",
        nav_downloads: "DESCARGAS",
        nav_updates: "ACTUALIZACIONES",
        nav_cases: "EXPEDIENTES",
        nav_about: "ACERCA DE",

        classified: "BASE DE DATOS DE INVESTIGACIONES CLASIFICADAS",
        hero_eyebrow: "SITIO WEB OFICIAL DEL JUEGO",
        hero_description: "Cada sospechoso tiene una historia. Cada historia tiene una grieta.",
        hero_download: "DESCARGAR JUEGO",
        hero_cases: "VER EXPEDIENTES",

        downloads_eyebrow: "ARCHIVOS DISPONIBLES",
        downloads_title: "DESCARGAS",
        download_description: "Descarga el paquete del juego y extrae los archivos antes de iniciarlo.",
        download_button: "DESCARGAR JUEGO",
        download_note: "Asegúrate de extraer el ZIP antes de abrir el launcher.",

        updates_eyebrow: "REGISTROS DE DESARROLLO",
        updates_title: "ACTUALIZACIONES",
        updates_loading: "Cargando registros de investigación...",
        updates_empty: "Todavía no se han publicado actualizaciones.",
        updates_error: "No se pudieron cargar los registros de investigación.",

        cases_eyebrow: "SUJETOS REGISTRADOS",
        cases_title: "EXPEDIENTES",
        case_available: "DISPONIBLE",
        case_pending: "PENDIENTE",
        case_senerdex: "La primera investigación. Un sospechoso, una serie de preguntas y una verdad esperando ser descubierta.",
        case_reler: "Los registros de investigación están en preparación.",
        case_kleb: "Los registros de investigación están en preparación.",
        case_ciberto: "Los registros de investigación están en preparación.",

        about_eyebrow: "INFORMACIÓN DE LA BASE DE DATOS",
        about_title: "ACERCA DEL PROYECTO",
        about_description: "CRIME INTERROGE es un juego de interrogatorios donde los jugadores cuestionan a sospechosos, investigan sus respuestas e intentan descubrir la verdad.",
        created_by: "CREADO POR",
        footer_text: "BASE DE DATOS OFICIAL DE INVESTIGACIÓN",

        type_release: "LANZAMIENTO",
        type_update: "ACTUALIZACIÓN",
        type_hotfix: "HOTFIX",
        type_new: "NUEVO",
        type_fixed: "CORREGIDO",
        type_improved: "MEJORADO",
        type_removed: "ELIMINADO"
    }
};

let currentLanguage = localStorage.getItem("crimeInterrogeLanguage") || "en";

if (!translations[currentLanguage]) {
    currentLanguage = "en";
}

const languageSelect = document.getElementById("languageSelect");
const updatesContainer = document.getElementById("updatesContainer");

let updateRecords = [];

function translate(key) {
    return translations[currentLanguage][key] || key;
}

function updateInterface() {
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = translate(key);
    });

    languageSelect.value = currentLanguage;

    renderUpdates();
}

function changeLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;

    localStorage.setItem("crimeInterrogeLanguage", language);

    updateInterface();
}

languageSelect.addEventListener("change", event => {
    changeLanguage(event.target.value);
});

function getLocalizedText(value) {
    if (typeof value === "string") {
        return value;
    }

    if (value && typeof value === "object") {
        return value[currentLanguage] || value.en || "";
    }

    return "";
}

function renderUpdates() {
    updatesContainer.replaceChildren();

    if (updateRecords.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-message";
        empty.textContent = translate("updates_empty");

        updatesContainer.appendChild(empty);
        return;
    }

    updateRecords.forEach(update => {
        const card = document.createElement("article");
        card.className = "update-card";

        const header = document.createElement("div");
        header.className = "update-header";

        const version = document.createElement("span");
        version.className = "update-version";
        version.textContent = `VERSION ${update.version || "?"}`;

        const date = document.createElement("span");
        date.className = "update-date";
        date.textContent = update.date || "";

        const type = document.createElement("span");
        type.className = "update-type";
        type.textContent = translate(`type_${update.type || "update"}`);

        header.append(version, date, type);

        const title = document.createElement("h3");
        title.textContent = getLocalizedText(update.title);

        const summary = document.createElement("p");
        summary.className = "update-summary";
        summary.textContent = getLocalizedText(update.summary);

        card.append(header, title, summary);

        if (Array.isArray(update.changes) && update.changes.length > 0) {
            const list = document.createElement("ul");
            list.className = "update-changes";

            update.changes.forEach(change => {
                const item = document.createElement("li");

                const tag = document.createElement("span");
                const changeType = change.type || "new";

                tag.className = `change-tag ${changeType}`;
                tag.textContent = translate(`type_${changeType}`);

                const description = document.createElement("span");
                description.textContent = getLocalizedText(change.text);

                item.append(tag, description);
                list.appendChild(item);
            });

            card.appendChild(list);
        }

        updatesContainer.appendChild(card);
    });
}

async function loadUpdates() {
    try {
        const response = await fetch(`updates.json?v=${Date.now()}`);

        if (!response.ok) {
            throw new Error("Could not load updates.json");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid update file format");
        }

        updateRecords = data;
        renderUpdates();

    } catch (error) {
        console.error("Update log error:", error);

        updatesContainer.replaceChildren();

        const message = document.createElement("p");
        message.className = "error-message";
        message.textContent = translate("updates_error");

        updatesContainer.appendChild(message);
    }
}

updateInterface();
loadUpdates();
