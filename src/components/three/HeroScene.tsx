import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const NODE_COUNT = 118;
const MAX_LINKS = 4;
const SIGNAL_COUNT = 22;

function InteractiveNetwork() {
  const points = useRef<THREE.InstancedMesh>(null);
  const lines = useRef<THREE.LineSegments>(null);
  const signals = useRef<THREE.InstancedMesh>(null);
  const network = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cursor = useRef(new THREE.Vector2(50, 50));

  const data = useMemo(() => {
    let seed = 41;
    const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const base = Array.from({ length: NODE_COUNT }, () => new THREE.Vector3((random() - .5) * 15.5, (random() - .5) * 8.4, (random() - .5) * 1.4));
    const current = base.map(p => p.clone());
    const velocity = base.map(() => new THREE.Vector3());
    const linkKeys = new Set<string>();
    base.forEach((p, i) => {
      base.map((q, j) => ({ j, distance: p.distanceTo(q) }))
        .filter(x => x.j !== i)
        .sort((a,b) => a.distance - b.distance)
        .slice(0, MAX_LINKS)
        .forEach(({ j }) => linkKeys.add(`${Math.min(i, j)}:${Math.max(i, j)}`));
    });
    const links = Array.from(linkKeys, key => key.split(':').map(Number) as [number, number]);
    return { base, current, velocity, links };
  }, []);

  const linePositions = useMemo(() => new Float32Array(data.links.length * 6), [data.links]);

  useFrame((state, delta) => {
    const target = new THREE.Vector2(state.pointer.x * 7.75, state.pointer.y * 4.2);
    cursor.current.lerp(target, .045);
    const time = state.clock.elapsedTime;
    if (network.current) {
      network.current.rotation.z = Math.sin(time * .11) * .006;
      network.current.position.y = Math.sin(time * .18) * .045;
      network.current.position.x = Math.cos(time * .13) * .035;
    }

    data.current.forEach((p, i) => {
      const home = data.base[i];
      const velocity = data.velocity[i];
      const dx = p.x - cursor.current.x;
      const dy = p.y - cursor.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 1.35) {
        const force = (1 - distance / 1.35) * .014;
        velocity.x += (dx / Math.max(distance, .1)) * force;
        velocity.y += (dy / Math.max(distance, .1)) * force;
      }
      velocity.x += (home.x + Math.sin(time * .18 + i) * .07 - p.x) * .012;
      velocity.y += (home.y + Math.cos(time * .15 + i * .7) * .06 - p.y) * .012;
      velocity.multiplyScalar(Math.pow(.9, delta * 60));
      p.addScaledVector(velocity, delta * 60);

      const hover = Math.max(0, 1 - distance / 1.4);
      const scale = (i % 13 === 0 ? .095 : i % 5 === 0 ? .061 : .034) * (1 + hover * .35);
      dummy.position.copy(p);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      points.current?.setMatrixAt(i, dummy.matrix);
      if (points.current) points.current.setColorAt(i, new THREE.Color().lerpColors(new THREE.Color('#9b93dc'), new THREE.Color('#7468df'), hover * .4));
    });
    if (points.current) {
      points.current.instanceMatrix.needsUpdate = true;
      if (points.current.instanceColor) points.current.instanceColor.needsUpdate = true;
    }
    data.links.forEach(([a,b], i) => {
      const start = data.current[a], end = data.current[b], offset = i * 6;
      linePositions[offset] = start.x; linePositions[offset+1] = start.y; linePositions[offset+2] = start.z;
      linePositions[offset+3] = end.x; linePositions[offset+4] = end.y; linePositions[offset+5] = end.z;
    });
    const attribute = lines.current?.geometry.getAttribute('position') as THREE.BufferAttribute | undefined;
    if (attribute) attribute.needsUpdate = true;
    for (let i = 0; i < SIGNAL_COUNT; i++) {
      const link = data.links[(i * 11 + 3) % data.links.length];
      if (!link) continue;
      const start = data.current[link[0]], end = data.current[link[1]];
      const progress = (time * (.1 + (i % 4) * .018) + i / SIGNAL_COUNT) % 1;
      dummy.position.lerpVectors(start, end, progress);
      const pulse = .019 + Math.sin(progress * Math.PI) * .015;
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      signals.current?.setMatrixAt(i, dummy.matrix);
    }
    if (signals.current) signals.current.instanceMatrix.needsUpdate = true;
  });

  return <group ref={network}>
    <lineSegments ref={lines}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3}/></bufferGeometry>
      <lineBasicMaterial color="#8c84ce" transparent opacity={.2} depthWrite={false}/>
    </lineSegments>
    <instancedMesh ref={points} args={[undefined, undefined, NODE_COUNT]}>
      <sphereGeometry args={[1, 14, 14]}/>
      <meshBasicMaterial color="#9890d8" transparent opacity={.52} depthWrite={false}/>
    </instancedMesh>
    <instancedMesh ref={signals} args={[undefined, undefined, SIGNAL_COUNT]}>
      <sphereGeometry args={[1,12,12]}/>
      <meshBasicMaterial color="#5b4ee8" transparent opacity={.8} depthWrite={false}/>
    </instancedMesh>
  </group>;
}

export default function HeroScene() {
  return <div className="h-full w-full" aria-hidden="true"><Canvas orthographic camera={{ position:[0,0,10], zoom:118, near:.1, far:30 }} dpr={[1,1.5]} gl={{ alpha:true, antialias:true }}><InteractiveNetwork/></Canvas></div>;
}
