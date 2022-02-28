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
    one: "rgb(231, 238, 247)",
    two: "rgb(214, 225, 235)",
    three: "rgb(220, 230, 241)",
    four: "rgb(223, 237, 251)",
    five: "rgb(233, 247, 255)",
    blue: "#648FFF",
    purple: "#785EF0",
    pink: "#DC267F",
  },
};
