import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM, VRMSchema, VRMUnlitMaterial } from '@pixiv/three-vrm';
import { Clock } from "three";

export default class ArtworkGL{
    constructor(props){
        this.props = props;
        const width = 960;
        const height = 540;
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.props.$canvas
          });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);
        // シーンを作成
        this.scene = new THREE.Scene();

        // カメラを作成
        this.camera = new THREE.PerspectiveCamera(45, width / height);
        this.camera.position.set(0, 0, 4);

        //平行光を作成
        const light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 1.0, 1.0, 1.0 ).normalize();
        this.scene.add( light );

        //モデルのロード
        const loader = new GLTFLoader();
        loader.load(

            // URL of the VRM you want to load
            '/shino.vrm',
        
            // called when the resource is loaded
            ( gltf ) => {
        
                // generate a VRM instance from gltf
                VRM.from( gltf ).then( ( vrm ) => {
        
                    vrm.humanoid.getBoneNode( VRMSchema.HumanoidBoneName.Hips ).rotation.y = Math.PI;
                
                    // add the loaded vrm to the scene
                    this.scene.add( vrm.scene );
                    
                    

                    // deal with vrm features
                    console.log( vrm );
                } );
        
            },
        
            // called while loading is progressing
            ( progress ) => {
                console.log( 'Loading model...', 100.0 * ( progress.loaded / progress.total ), '%' )
            },
        
            // called when loading has errors
            ( error ) => { console.error(error)}
        
        );

        this.clock = new Clock();
        this.clock.start();

        this.loop ()
    }

    loop () {
        this.tick()
        const deltaTime = this.clock.getDelta();
        requestAnimationFrame(this.loop.bind(this))
    }

    tick () {
        const s = Math.sin( Math.PI * this.clock.elapsedTime );
        //console.log(this.currentVrm.blendShapeProxy)


        this.renderer.render(this.scene, this.camera); // レンダリング   

    }
}