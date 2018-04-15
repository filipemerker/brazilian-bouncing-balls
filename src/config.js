const particlesJSON = {
  empty: 'http://www.json-generator.com/api/json/get/bVRkgkzMUi?indent=2',
  full: 'http://www.json-generator.com/api/json/get/bPeIeVxYOa?indent=2',
  local: 'assets/json/hugs.json'
}
const particleCount        = 10;
const bounceCriteria       = 200;
const mapPath              = require('@/assets/svg/brasil-wat.svg');
const widgetSize           = { width: 500, height: 500 };
const particlesAlpha       = .8;
const particlesLimit       = 150;
const particlesRadiusRange = [7, 15];
const particlesColorRange  = [
  {label: "Amor", color: {r:234, g: 107, b:135}},
  {label: "Saudade", color: {r:153, g: 129, b:157}},
  {label: "Carinho", color: {r:243, g: 218, b:141}},
  {label: "Conforto", color: {r:188, g: 165, b:193}},
  {label: "Alegria", color: {r:173, g: 162, b:75}},
  {label: "Amizade", color: {r:218, g: 205, b:197}},
  {label: "Gratidão", color: {r:199, g: 90, b:113}},
  {label: "Inspiração", color: {r:205, g: 193, b:112}},
  {label: "Paixão", color: {r:193, g: 164, b:73}},
  {label: "Esperança", color: {r:147, g: 74, b:99}}
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