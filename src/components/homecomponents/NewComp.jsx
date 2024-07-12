// // import React, { useRef, useEffect, useState } from 'react';
// // import { Canvas } from '@react-three/fiber';
// // import { OrbitControls, useGLTF } from '@react-three/drei';
// // import { a, useSpring } from '@react-spring/three';
// // import './App.css';

// // function Model({ scrollY }) {
// //     const gltf = useGLTF('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf');
// //     const ref = useRef();

// //     const { rotation } = useSpring({
// //         rotation: [0, scrollY * 0.001, 0],
// //         config: { mass: 1, tension: 1000, friction: 50 },
// //     });

// //     return <a.primitive object={gltf.scene} ref={ref} rotation={rotation} scale={2} />;
// // }

// // function App() {
// //     const [scrollY, setScrollY] = useState(0);

// //     const handleScroll = () => {
// //         setScrollY(window.scrollY);
// //     };

// //     useEffect(() => {
// //         window.addEventListener('scroll', handleScroll);
// //         return () => window.removeEventListener('scroll', handleScroll);
// //     }, []);

// //     return (
// //         <div style={{ height: '800vh' }}>
// //             <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
// //                 <ambientLight />
// //                 <pointLight position={[10, 10, 10]} />
// //                 <Model scrollY={scrollY} />
// //                 <OrbitControls enableZoom={false} />
// //             </Canvas>
// //             <div className="oneDiv one">
// //                 <h1>Scroll down to see the 3D model animate</h1>
// //             </div>
// //             <div className="oneDiv two">
// //                 <h1>Keep scrolling...</h1>
// //             </div>
// //             <div className="oneDiv three">
// //                 <h1>Almost there...</h1>
// //             </div>
// //             <div className="oneDiv four">
// //                 <h1>Just a bit more...</h1>
// //             </div>
// //             <div className="oneDiv five">
// //                 <h1>Halfway through!</h1>
// //             </div>
// //             <div className="oneDiv six">
// //                 <h1>Keep going...</h1>
// //             </div>
// //             <div className="oneDiv seven">
// //                 <h1>You're doing great!</h1>
// //             </div>
// //             <div className="oneDiv eight">
// //                 <h1>Almost done...</h1>
// //             </div>
// //         </div>
// //     );
// // }

// // export default App;



// import React, { useRef, useEffect, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import { a, useSpring } from '@react-spring/three';

// function Model({ scrollY }) {
//     // const gltf = useGLTF('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf');
//     const gltf = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/zombie-car/model.gltf');
//     const ref = useRef();

//     // Applying a violet material to the model
//     useEffect(() => {
//         if (gltf.scene) {
//             gltf.scene.traverse((child) => {
//                 // if (child.isMesh) {
//                 //     child.material.color.setHex(0xffb6c1); // Violet color
//                 // }
//             });
//         }
//     }, [gltf]);

//     const { rotation } = useSpring({
//         rotation: [0, scrollY * 0.001, 0],
//         config: { mass: 1, tension: 800, friction: 60 },
//     });

//     return <a.primitive object={gltf.scene} ref={ref} rotation={rotation} scale={2} />;
// }

// function App() {
//     const [scrollY, setScrollY] = useState(0);

//     const handleScroll = () => {
//         setScrollY(window.scrollY);
//     };

//     useEffect(() => {
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <div style={{ height: '800vh' }}>
//             <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
//                 <ambientLight />
//                 <pointLight position={[0, 0, 0]} />
//                 <Model scrollY={scrollY} />
//                 <OrbitControls enableZoom={false} />
//             </Canvas>
//             <div className="oneDiv one">
//                 <h1>Scroll down to see the 3D model animate</h1>
//             </div>
//             <div className="oneDiv two">
//                 <h1>Keep scrolling...</h1>
//             </div>
//             <div className="oneDiv three">
//                 <h1>Almost there...</h1>
//             </div>
//             <div className="oneDiv four">
//                 <h1>Just a bit more...</h1>
//             </div>
//             <div className="oneDiv five">
//                 <h1>Halfway through!</h1>
//             </div>
//             <div className="oneDiv six">
//                 <h1>Keep going...</h1>
//             </div>
//             <div className="oneDiv seven">
//                 <h1>You're doing great!</h1>
//             </div>
//             <div className="oneDiv eight">
//                 <h1>Almost done...</h1>
//             </div>
//         </div>
//     );
// }

// export default App;








import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { Color, AnimationMixer, LoopRepeat } from 'three';

function Model({ scrollY }) {
    const gltf = useGLTF("/scene.gltf"); // Ensure the correct path
    const ref = useRef();
    const mixer = useRef();
    const action = useRef();
    const isScrolling = useRef(false);

    useEffect(() => {
        if (gltf.scene) {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.color = new Color(0xffffff); // White color
                    child.material.emissive = new Color(0xff0000); // Red color
                    child.material.emissiveIntensity = 1;
                    child.material.specular = new Color(0x646535); // Sets specular color
                    child.material.shininess = 30; // Sets shininess
                }
            });
        }

        if (gltf.animations.length > 0) {
            mixer.current = new AnimationMixer(gltf.scene);
            action.current = mixer.current.clipAction(gltf.animations[0]);
            action.current.setLoop(LoopRepeat, Infinity);
            action.current.play();
            action.current.paused = true; // Start in paused state
        }

        return () => {
            if (mixer.current) {
                mixer.current.stopAllAction();
            }
        };
    }, [gltf]);

    useEffect(() => {
        if (action.current) {
            if (scrollY > 0) {
                action.current.paused = false;
            } else {
                action.current.paused = true;
            }
        }
    }, [scrollY]);

    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta);
        }
    });

    const { rotation } = useSpring({
        rotation: [0, scrollY * 0.001, 0],
        config: { mass: 1, tension: 800, friction: 60 },
    });

    return <a.primitive object={gltf.scene} ref={ref} rotation={rotation} scale={2} />;
}

function App() {
    const [scrollY, setScrollY] = useState(0);
    const scrollTimeout = useRef(null);

    const handleScroll = () => {
        setScrollY(window.scrollY);

        if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = setTimeout(() => {
            setScrollY(0); // Reset scrollY to stop the animation
        }, 100); // 100ms delay to detect scroll stop
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{ height: '800vh' }}>
            <Canvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100%' }}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Model scrollY={scrollY} />
                <OrbitControls enableZoom={false} />
            </Canvas>
            <div className="oneDiv one">
                <h1>Scroll down to see the 3D model animate</h1>
            </div>
            <div className="oneDiv two">
                <h1>Keep scrolling...</h1>
            </div>
            <div className="oneDiv three">
                <h1>Almost there...</h1>
            </div>
            <div className="oneDiv four">
                <h1>Just a bit more...</h1>
            </div>
            <div className="oneDiv five">
                <h1>Halfway through!</h1>
            </div>
            <div className="oneDiv six">
                <h1>Keep going...</h1>
            </div>
            <div className="oneDiv seven">
                <h1>You're doing great!</h1>
            </div>
            <div className="oneDiv eight">
                <h1>Almost done...</h1>
            </div>
        </div>
    );
}

export default App;
