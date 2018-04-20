import { particlesColorRange } from '@/config';

const feelingToRGB = feeling => particlesColorRange[feeling].color;

const likesToRadius = (likes, particlesRadiusRange) => {
  let diameter = 0;
  let minDiameter = particlesRadiusRange[0] * 2;
  let maxDiameter = particlesRadiusRange[1] * 2;
  likes = likes < 0 ? 0 : likes;
  for (let i = 0; i < maxDiameter; i += 4) {
    if (likes >= i && likes <= i+4) diameter = minDiameter + i;
  }

  return !diameter ? 50 / 2 : diameter / 2;
}

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const serialize = obj => Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');

const dataURItoBlob = dataURI => {
  let byteString = atob(dataURI.split(',')[1]);
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++){
    ia[i] = byteString.charCodeAt(i);
  }
  let ext = mimeString.split('/')[1];
  let bb = new Blob([ab], { "type": mimeString });
  return {
    bb,
    ext
  };
}

const rgbToHex = (rgb) => {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

const removeSpecialChar = newString => {
  var string = newString;
  var specialCharMap  = {
    a : /[\xE0-\xE6]/g,
    e : /[\xE8-\xEB]/g,
    i : /[\xEC-\xEF]/g,
    o : /[\xF2-\xF6]/g,
    u : /[\xF9-\xFC]/g,
    c : /\xE7/g,
    n : /\xF1/g
  };

  for ( var letter in specialCharMap ) {
    var regularExpression = specialCharMap[letter];
    string = string.replace( regularExpression, letter );
  }

  return string;
}

export {
  removeSpecialChar,
  likesToRadius,
  dataURItoBlob,
  feelingToRGB,
  getRandomInt,
  getRandom,
  serialize,
  rgbToHex
};
