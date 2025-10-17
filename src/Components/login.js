document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btn-login");
    const loginOverlay = document.querySelector(".login");
    const baseContainer = document.querySelector(".base-container");
    const nav = document.querySelector("nav");

    btnLogin.addEventListener("click", () => {
        loginOverlay.style.display = "flex";
        baseContainer.style.filter = "blur(6px)";
        nav.style.filter = "blur(6px)";
        baseContainer.style.pointerEvents = "none";
        nav.style.pointerEvents = "none";
    });

    loginOverlay.addEventListener("click", (e) => {
        if (e.target === loginOverlay) {
        loginOverlay.style.display = "none";
        baseContainer.style.filter = "none";
        nav.style.filter = "none";
        baseContainer.style.pointerEvents = "auto";
        nav.style.pointerEvents = "auto";
        }
    });
});
