/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.[tj]sx"],
  theme: {
    extend: {
      animation: {
        text: "text 1s linear infinite",
      },
      keyframes: {
        text: {
          "0%": {
            "background-size": "200% 100%",
            "background-position": "0% 0%",
          },
          "100%": {
            "background-size": "200% 100%",
            "background-position": "200% 0%",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        nightsky: {
          // Based on:
          // https://www.schemecolor.com/night-sky-color-palette.php
          "color-scheme": "dark",
          primary: "#6b4984",
          secondary: "#855988",
          accent: "#2b2f77",
          neutral: "#2B1F46",
          "base-100": "#060719",
          "base-content": "#EEEEEE",
          info: "#0091D5",
          success: "#6BB187",
          warning: "#DBAE59",
          error: "#AC3E31",
          "--btn-text-case": "none",
        },
      },
    ],
  },
};
