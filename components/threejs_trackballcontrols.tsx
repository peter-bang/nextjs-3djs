import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

const ThreeJS_TrackballControls = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const scene = new THREE.Scene();
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });
      renderer.outputEncoding = THREE.sRGBEncoding;
      const camera = new THREE.PerspectiveCamera(30, 1);
      camera.position.set(0, 0, 5);
      const loader = new GLTFLoader();
      scene.background = new THREE.Color("white");
      const light = new THREE.DirectionalLight(0xffffff, 10);
      scene.add(light);
      const controls = new TrackballControls(camera, renderer.domElement);
      controls.update();
      loader.load("/scene.gltf", (object) => {
        scene.add(object.scene);
        const animate = () => {
          requestAnimationFrame(animate);
          object.scene.rotation.y += 0.01;
          renderer.render(scene, camera);
          controls.update();
        };
        animate();
      });
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} id="canvas" width="300" height="300"></canvas>
      <h1>trackballcontrols</h1>
    </div>
  );
};

export default ThreeJS_TrackballControls;
