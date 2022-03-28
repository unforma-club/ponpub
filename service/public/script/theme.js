(function () {
    const el = document.documentElement;
    const storedTheme = localStorage.getItem("theme");
    const attr = "data-theme";

    switch (storedTheme) {
        case "dark":
            el.setAttribute(attr, "dark");
            break;
        case "light":
            el.setAttribute(attr, "light");
            break;
        default:
            el.setAttribute(attr, "light");
            break;
    }
})();
