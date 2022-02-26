export type themeType = { color: { [name: string]: string } };

export const darkTheme: themeType = {
  color: {
    text: "rgb(255, 255, 255)",
    text_muted: "rgb(95, 113, 131)",
    border: "rgb(69, 87, 102)",
    one: "rgb(9, 17, 24)",
    two: "rgb(21, 30, 39)",
    three: "rgb(44, 58, 73)",
    four: "rgb(69, 87, 102)",
    five: "rgb(95, 113, 131)",
    blue: "#648FFF",
    purple: "#785EF0",
    pink: "#DC267F",
  },
};

export const lightTheme: themeType = {
  color: {
    text: "rgb(9, 17, 24)",
    text_muted: "rgb(95, 113, 131)",
    border: "rgb(95, 113, 131)",
    one: "rgb(255, 255, 255)",
    two: "rgb(216, 228, 241)",
    three: "rgb(218, 224, 236)",
    four: "rgb(234, 242, 247)",
    five: "rgb(255, 255, 255)",
    blue: "#648FFF",
    purple: "#785EF0",
    pink: "#DC267F",
  },
};
