export const themeInitScript = `
  (function() {
    try {
      const raw = localStorage.getItem("theme-storage");
      if (raw) {
        const parsed = JSON.parse(raw);
        const theme = parsed?.state?.selectedTheme || "default";
        document.documentElement.setAttribute("data-theme", theme);
      } else {
        document.documentElement.setAttribute("data-theme", "default");
      }
    } catch (error) {
      console.error("[Theme Init]", error);
      document.documentElement.setAttribute("data-theme", "default");
    }
  })();
`;
