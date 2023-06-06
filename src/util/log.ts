const colorSequence: ColorSequence = {
  blue: "\x1b[34m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blueBright: "\x1b[94m",
};

function getHighlightedText(str: string, color: Color) {
  const regex = /\*(.*?)\*/g;
  const highlighted = str.replace(regex, `${colorSequence[color]}$1\x1b[0m`);
  return highlighted.includes("\x1b")
    ? highlighted
    : colorSequence[color] + str.toString() + "\x1b[0m";
}

function useColor(str: string, color: Color) {
  return `${colorSequence[color]}${str}\x1b[0m`;
}

export default function bootstrapLog(isDebug: boolean) {
  String.prototype.color = function (color: Color) {
    return useColor(this.toString(), color);
  };

  String.prototype.log = function () {
    isDebug && console.log(this);
  };

  String.prototype.logBlue = function () {
    if (!isDebug) return;
    console.log(getHighlightedText(this.toString(), "blue"));
  };

  String.prototype.logSkyblue = function () {
    if (!isDebug) return;
    console.log(getHighlightedText(this.toString(), "blueBright"));
  };

  String.prototype.logGreen = function () {
    if (!isDebug) return;
    console.log(getHighlightedText(this.toString(), "green"));
  };

  String.prototype.logRed = function () {
    if (!isDebug) return;
    console.log(getHighlightedText(this.toString(), "red"));
  };

  String.prototype.logYellow = function () {
    if (!isDebug) return;
    console.log(getHighlightedText(this.toString(), "yellow"));
  };

  String.prototype.blue = function () {
    return useColor(this.toString(), "blue");
  };

  String.prototype.skyBlue = function () {
    return useColor(this.toString(), "blueBright");
  };

  String.prototype.red = function () {
    return useColor(this.toString(), "red");
  };

  String.prototype.green = function () {
    return useColor(this.toString(), "green");
  };

  String.prototype.yellow = function () {
    return useColor(this.toString(), "yellow");
  };
}
