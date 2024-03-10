/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      textColor: {
        '1': 'var(--cmpui-text1-color)',
        '2': 'var(--cmpui-text2-color)',
        '3': 'var(--cmpui-text3-color)',
      },
      spacing: {
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        28: "28px",
        32: "32px",
      },
    },
  },
  plugins: [],
};
