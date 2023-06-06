export {};

declare global {
  interface String {
    log: () => void;
    logBlue: () => void;
    logSkyblue: () => void;
    logGreen: () => void;
    logRed: () => void;
    logYellow: () => void;
    color: (color: Color) => string;
    blue: () => string;
    skyBlue: () => string;
    red: () => string;
    green: () => string;
    yellow: () => string;
  }

  type Color = "blue" | "blueBright" | "green" | "red" | "yellow";

  type ColorSequence = {
    [Key in Color]: string;
  };
}
