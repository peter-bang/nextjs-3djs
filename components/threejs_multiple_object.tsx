import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeJSMultipleObject = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });
      renderer.outputEncoding = THREE.sRGBEncoding;
      const camera = new THREE.PerspectiveCamera();
      camera.position.set(0, 0, 5);
      const loader = new GLTFLoader();
      scene.background = new THREE.Color("green");
      const light = new THREE.DirectionalLight(0xffffff, 10);
      scene.add(light);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();
      //Promise.all
      Promise.all([
        loader.loadAsync("/scene.gltf"),
        loader.loadAsync("/scene.gltf"),
      ]).then((results) => {
        const [objectA, objectB] = results;
        scene.add(objectA.scene);
        scene.add(objectB.scene);
        objectA.scene.position.set(1, 0, 0);
        objectB.scene.position.set(-1, 0, 0);
        const animate = () => {
          requestAnimationFrame(animate);
          objectA.scene.rotation.y += 0.01;
          objectB.scene.rotation.y -= 0.01;
          renderer.render(scene, camera);
          controls.update();
        };
        animate();
      });
      // async, await promise all
      //   const mainLoader = async () => {
      //     const [objectA, objectB] = await Promise.all([
      //       loader.loadAsync("/scene.gltf"),
      //       loader.loadAsync("/scene.gltf"),
      //     ]);
      //     scene.add(objectA.scene);
      //     scene.add(objectB.scene);
      //     objectA.scene.position.set(1, 0, 0);
      //     objectB.scene.position.set(-1, 0, 0);
      //     const animate = () => {
      //       requestAnimationFrame(animate);
      //       objectA.scene.rotation.y += 0.01;
      //       objectB.scene.rotation.y -= 0.01;
      //       renderer.render(scene, camera);
      //       controls.update();
      //     };
      //     animate();
      //   };
      //   mainLoader();
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} id="canvas" width="300" height="300"></canvas>
      <h1>Multiple objects</h1>
    </div>
  );
};

export default ThreeJSMultipleObject;
