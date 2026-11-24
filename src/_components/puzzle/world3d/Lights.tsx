import { palette } from "./materials";

export function Lights() {
  return (
    <>
      <ambientLight intensity={1.6} />
      <hemisphereLight args={[palette.paper, palette.lilac, 0.8]} />
      <directionalLight
        position={[6, 12, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  );
}
