const particlesJSON = {
  empty: 'http://www.json-generator.com/api/json/get/bVRkgkzMUi?indent=2',
  full: 'http://www.json-generator.com/api/json/get/bPeIeVxYOa?indent=2',
  local: 'assets/json/hugs.json'
}
const particleCount        = 10;
const bounceCriteria       = 250;
const mapPath              = require('@/assets/svg/brasil-wat.svg');
const widgetSize           = { width: 500, height: 500 };
const particlesAlpha       = .65;
const particlesLimit       = 50;
const particlesRadiusRange = [7, 15];
const particlesColorRange  = [
  {label: "Amor", color: {r:233, g: 65, b:85}},
  {label: "Saudade", color: {r:255, g: 112, b:67}},
  {label: "Carinho", color: {r:71, g: 142, b:61}},
  {label: "Conforto", color: {r:56, g: 121, b:57}},
  {label: "Alegria", color: {r:47, g: 136, b:210}},
  {label: "Amizade", color: {r:103, g: 58, b:183}},
  {label: "Gratidão", color: {r:246, g: 183, b:75}},
  {label: "Inspiração", color: {r:252, g: 224, b:129}},
  {label: "Paixão", color: {r:139, g: 195, b:73}},
  {label: "Esperança", color: {r:84, g: 110, b:112}}
];

export {
  particlesRadiusRange,
  particlesColorRange,
  bounceCriteria,
  particlesAlpha,
  particlesLimit,
  particlesJSON,
  particleCount,
  widgetSize,
  mapPath
};