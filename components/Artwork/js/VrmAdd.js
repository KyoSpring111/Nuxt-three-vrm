import * as THREE from "three";
import Common from "./Common";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM } from '@pixiv/three-vrm';

export default class VrmAdd{
    constructor(){
        this.currentVRM = undefined;
        this.init();
    }
    init(){
        const loader = new GLTFLoader(); // vrmをGLTFLoaderで読み込む
        loader.load( // モデルを読み込む
        '~/assets/three-vrm-girl.vrm', // モデルデータのURL
        ( gltf ) => { initVRM( gltf ); }, // モデルが読み込まれたあとの処理
        ( progress ) => { console.info( ( 100.0 * progress.loaded / progress.total ).toFixed( 2 ) + '% loaded' ); }, // モデル読み込みの進捗を表示
        ( error ) => {  } // モデル読み込み時のエラーを表示
        );
    }
    initVRM( gltf ) { // モデルが読み込まれたあとの処理
        console.log('initVRM')
        VRM.from( gltf ).then( ( vrm ) => { // gltfをvrmにする
          Common.scene.add( vrm.scene ); // gltfのモデルをsceneに追加
          vrm.scene.rotation.y = Math.PI;
      
          vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftUpperArm).rotation.set( 0.6, 0, 0);
          vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftLowerArm).rotation.set( 0.8, -1, 0);
          vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.LeftHand).rotation.set( 0, -0.5, 0);
          vrm.humanoid.getBoneNode(THREE.VRMSchema.HumanoidBoneName.RightUpperArm).rotation.set( 0, 0, -1.3);
      
          this.currentVRM = vrm; // currentGLTFにvrmを代入
      
          const head = vrm.humanoid.getBoneNode( THREE.VRMSchema.HumanoidBoneName.Head ); // vrmの頭を参照する
          camera.position.set( 0.0, head.getWorldPosition(new THREE.Vector3()).y, 2.0 ); // カメラを頭が中心に来るように動かす
          
        } );
   }

   update(){  
        const delta = clock.getDelta();
    
        if ( currentVRM ) { // VRMが読み込まれていれば
        this.currentVRM.scene.rotation.y = Math.PI * Math.sin( clock.getElapsedTime() ); // VRMを回転する
        this.currentVRM.update( delta ); // VRMの各コンポーネントを更新
        }
    }
}