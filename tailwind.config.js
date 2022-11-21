/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,html,pr}"],
  theme: {
    screens: {
      sm: "660px",
      md: "768px",
      lg: "960px",
      xl: "1260px",
      xxl: "1560px"
    },
    fontFamily: {
      sans: [
        "Helvetica Neue",
        "Arial",
        "Hiragino Kaku Gothic ProN",
        "Hiragino Sans",
        "Meiryo",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        primary: "var(--colorAccent)",
        valid: "var(--calloutSuccessInk)",
        invalid: "var(--calloutDangerInk)",
        link: "var(--color-link)"
      },
      spacing: {
        xs: ".5rem",      // 8px
        s: "1rem",        // 16px
        m: "1.5rem",      // 24px
        l: "2.5rem",      // 40px
        xl: "3.75rem",    // 60px
        xxl: "5rem",      // 80px
      },
    },
  },
  plugins: [],
}
