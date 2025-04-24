import { actualizarModal } from "./modalHelper.js"

export function initEventHandlers() {
    document.addEventListener("click", (e) => {
        const card = e.target.closest(".card");
        if (card && !e.target.closest(".dropdown") && !card.dataset.bsToggle) {
            window.location.href = card.dataset.url;
        }
        if (e.target.closest("[data-bs-target='#modal']")) {
            actualizarModal(e.target.closest("[data-bs-target='#modal']"));
        }
        if (e.target.closest(".dropdown-toggle")) {
            e.stopPropagation();
        }
    });
}