import * as THREE from "three";

// three.js needs raw colors: they mirror the theme tokens of globals.css.
export const palette = {
  ink: "#2b1a37",
  grape: "#814f96",
  lilac: "#cdb9e3",
  sky: "#4fc3f7",
  pink: "#ff8fc7",
  mint: "#68c1be",
  sun: "#ffd23f",
  gem: "#36e2f5",
  slime: "#7bd88f",
  slimeCore: "#3fae4a",
  coral: "#ff6b57",
  paper: "#ffffff",
  cream: "#fbf1e5",
  orange: "#f39d43",
  violet: "#814f96",
  turquoise: "#68c1be",
  wood: "#b5672d",
  stream: "#3aa6e8",
  streamSoft: "#bfe6fb",
  lava: "#ff5a1f",
  lavaDark: "#8c2a14",
  rock: "#a99bbd",
  rockDark: "#7d6e94",
};

export const flat = (
  color: string,
  extra: THREE.MeshLambertMaterialParameters = {},
) => new THREE.MeshLambertMaterial({ color, flatShading: true, ...extra });

const glow = (color: string) =>
  new THREE.MeshBasicMaterial({ color, toneMapped: false });

export const materials = {
  island: flat(palette.violet),
  trace: glow("#b5ebe8"),
  lane: flat(palette.cream),
  laneAlt: flat("#f3dfca"),
  board: flat(palette.turquoise),
  boardTrace: glow("#e6fbf9"),
  server: flat("#cdb9e3"),
  serverAlt: flat("#b9a1d4"),
  slot: flat(palette.ink),
  status: glow("#8ff5ee"),
  chip: flat(palette.ink),
  chipLabel: flat("#ffffff"),
  pin: flat("#c9ced8"),
  capacitor: flat(palette.orange),
  capacitorTop: flat(palette.cream),
  wood: flat(palette.wood),
  stream: new THREE.MeshPhongMaterial({
    color: palette.stream,
    emissive: "#0b3f73",
    shininess: 120,
    transparent: true,
    opacity: 0.9,
  }),
  streamBit: glow(palette.streamSoft),
  streamBed: flat("#1f5f96"),
  lava: new THREE.MeshPhongMaterial({
    color: palette.lava,
    emissive: "#ff3d00",
    emissiveIntensity: 0.8,
    flatShading: true,
  }),
  lavaBed: flat(palette.lavaDark),
  ember: glow(palette.sun),
  rock: flat(palette.rock),
  rockDark: flat(palette.rockDark),
  mail: flat(palette.paper),
  gate: flat(palette.coral),
  gatePost: flat(palette.violet),
  coins: new THREE.MeshPhongMaterial({
    color: palette.sun,
    emissive: "#a07800",
    shininess: 100,
    flatShading: true,
  }),
  gold: new THREE.MeshPhongMaterial({
    color: palette.sun,
    emissive: "#7a5a00",
    shininess: 80,
  }),
  gem: new THREE.MeshPhongMaterial({
    color: palette.gem,
    emissive: "#0a6f86",
    shininess: 90,
    flatShading: true,
  }),
  slime: new THREE.MeshLambertMaterial({
    color: palette.slime,
    transparent: true,
    opacity: 0.85,
    flatShading: true,
  }),
  slimeCore: flat(palette.slimeCore),
  virus: flat(palette.coral),
  virusSpike: flat("#c93a2a"),
  eye: flat(palette.paper),
  ink: flat(palette.ink),
  beam: new THREE.MeshBasicMaterial({
    color: palette.sun,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  }),
  arrow: new THREE.MeshBasicMaterial({
    color: palette.sun,
    side: THREE.DoubleSide,
  }),
  shadow: new THREE.MeshBasicMaterial({
    color: palette.ink,
    transparent: true,
    opacity: 0.2,
  }),
};

export const groundMaterials = (wall: boolean, alt: boolean) => {
  const top = wall ? materials.board : alt ? materials.lane : materials.laneAlt;
  const side = materials.island;
  return [side, side, top, side, side, side];
};

export const arrowGeometry = (() => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([-0.2, 0, 0, 0, 0, 0.3, 0.2, 0, 0], 3),
  );
  geometry.computeVertexNormals();
  return geometry;
})();

export const hash = (x: number, y: number) =>
  ((x * 73856093) ^ (y * 19349663)) >>> 0;

export const dirAngles = [Math.PI, Math.PI / 2, 0, -Math.PI / 2];

export const turnTowards = (from: number, to: number) =>
  ((((to - from + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) -
  Math.PI;
