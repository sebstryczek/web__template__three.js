import * as THREE from "three";

const isMesh = (object3D?: THREE.Object3D): object3D is THREE.Mesh => {
  return object3D !== undefined && "isMesh" in object3D;
};

export { isMesh };
