import * as THREE from "three";

interface Props {
  color: THREE.ColorRepresentation;
  size?: number;
  isWireframe?: boolean;
  opacity?: number;
}

const createPlane = ({ color, size = 1, isWireframe = false, opacity = 1 }: Props) => {
  const geometry = new THREE.PlaneGeometry(size, size, size);

  const material = new THREE.MeshBasicMaterial({
    color,
    opacity,
    transparent: opacity < 1,
    side: THREE.DoubleSide,
    wireframe: isWireframe,
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);

  return mesh;
};

export { createPlane };
