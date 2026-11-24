import * as THREE from "three";
import { flat, palette } from "@/_components/puzzle/world3d/materials";

// three.js needs raw colors: they mirror the fur tokens of globals.css.
const furColors: Record<string, [string, string]> = {
  ginger: ["#ff9a3c", "#e07a1f"],
  snow: ["#f4f1f8", "#c9c1d6"],
  midnight: ["#5b5191", "#3f3770"],
  mint: ["#8ed6d3", "#4fa8a5"],
  bubblegum: ["#ffb0d6", "#e866a8"],
  lilac: ["#cdb9e3", "#a88cc9"],
  gold: ["#ffd23f", "#e0ae10"],
  matrix: ["#7bd88f", "#3fae4a"],
};

export const furMaterials = Object.fromEntries(
  Object.entries(furColors).map(([id, [fur, dark]]) => [
    id,
    { fur: flat(fur), furDark: flat(dark) },
  ]),
);

export const catMaterials = {
  ...furMaterials.ginger,
  ear: flat(palette.pink),
  eye: flat(palette.paper),
  ink: flat(palette.ink),
};

export const outfitMaterials = {
  mint: flat(palette.mint),
  coral: flat(palette.coral),
  sky: flat(palette.sky),
  orange: flat(palette.orange),
  grape: flat(palette.grape),
  lilac: flat(palette.lilac),
  pink: flat(palette.pink),
  rock: flat(palette.rock),
  steel: flat("#c9ced8"),
  ink: flat(palette.ink),
  gold: new THREE.MeshPhongMaterial({
    color: "#ffd23f",
    emissive: "#7a5a00",
    shininess: 80,
    flatShading: true,
  }),
  visor: new THREE.MeshPhongMaterial({
    color: palette.gem,
    emissive: "#0a6f86",
    transparent: true,
    opacity: 0.75,
    shininess: 120,
  }),
};

const glow = (color: string, opacity = 1) =>
  new THREE.MeshBasicMaterial({
    color,
    toneMapped: false,
    transparent: opacity < 1,
    opacity,
  });

const trailColors: Record<string, string[]> = {
  sparkles: ["#ffd23f", "#fff1bf"],
  bubbles: ["#bfe6fb", "#4fc3f7"],
  bits: ["#7bd88f", "#3fae4a"],
  rainbow: ["#ff6b57", "#f39d43", "#ffd23f", "#7bd88f", "#4fc3f7", "#814f96"],
  flames: ["#ff5a1f", "#f39d43", "#ffd23f"],
};

export const trailMaterials = Object.fromEntries(
  Object.entries(trailColors).map(([id, colors]) => [
    id,
    colors.map((color) => glow(color, id === "bubbles" ? 0.7 : 1)),
  ]),
);

export const trailGeometries: Record<string, THREE.BufferGeometry> = {
  sparkles: new THREE.OctahedronGeometry(0.06),
  bubbles: new THREE.SphereGeometry(0.07, 8, 6),
  bits: new THREE.BoxGeometry(0.07, 0.07, 0.07),
  rainbow: new THREE.BoxGeometry(0.06, 0.06, 0.06),
  flames: new THREE.TetrahedronGeometry(0.08),
};
