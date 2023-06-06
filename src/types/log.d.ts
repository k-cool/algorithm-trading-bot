export {};

declare global {
  interface String {
    log: () => void;
    logBlue: () => void;
    logPurple: () => void;
    logGreen: () => void;
    logRed: () => void;
    logYellow: () => void;
    color: (color: Color) => string;
    blue: () => string;
    purple: () => string;
    red: () => string;
    green: () => string;
    yellow: () => string;
  }

  type Color = "blue" | "purple" | "green" | "red" | "yellow";

  type ColorSequence = {
    [Key in Color]: string;
  };
}
