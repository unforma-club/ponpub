(function () {
    const el = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const attr = "data-theme";

    const MEDIA = "(prefers-color-scheme: dark)";
    const matchesDark = window.matchMedia(MEDIA).matches;

    switch (storedTheme) {
        case "dark":
            el.setAttribute(attr, "dark");
            break;
        case "light":
            el.setAttribute(attr, "light");
            break;
        default:
            el.setAttribute(attr, matchesDark ? "dark" : "light");
            break;
    }
})();
