'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

// longitude, latitude of example recycling building
const RClongitude = 0
const RClatitude = 0

// area range of recycling buildings
const latitudeDelta = 0.0100
const longitudeDelta = 0.0080

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      user: {
        latitude: 0,
        longitude: 0,
      },
      visibility: false
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  // TODO: get permissions for user's location

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.2, .2, .2]} height={1} width={4} position={[0, .6, -1]} style={styles.helloWorldTextStyle} visible={this.state.visibility} />

        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 2, 1]} color="#ffffff" castsShadow={true} />

          {/* <Viro3DObject
            // bird from https://free3d.com/3d-model/bird-v1--875504.html
            source={require('./res/Bird_v1/12213_Bird_v1_l3.obj')}
            position={[0, 0, -1]}
            scale={[.05, .05, .05]}
            rotation={[0, 90, 90]}
            type="OBJ"
            visible={this.state.visibility}
            // dragType="FixedDistance" onDrag={()=>{}} // allows user to drag 3D object around with finger
          /> */}

          {/* <Viro3DObject
            // bird from https://opengameart.org/content/low-poly-bird
            source={require('./res/bird2/Low_Poly_Bird.obj')}
            position={[0, 0.4, -1]}
            scale={[.05, .05, .05]}
            rotation={[0, 0, 0]}
            type="OBJ"
            visible={this.state.visibility}
            // dragType="FixedDistance" onDrag={()=>{}} // allows user to drag 3D object around with finger
          /> */}

          {/* <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                      require('./res/emoji_smile/emoji_smile_normal.png'),
                      require('./res/emoji_smile/emoji_smile_specular.png')]}
            position={[0, 0.2, -1]}
            scale={[.2, .2, .2]}
            rotation={[0, 0, 0]}
            type="VRX"
            animation={{name:"02", run:true, loop:true,}}
            visible={this.state.visibility}
            // dragType="FixedDistance" onDrag={()=>{}} // allows user to drag 3D object around with finger
          /> */}

           <Viro3DObject
            // bird from https://opengameart.org/content/monkey-3d-model-rigged-fbx
            source={require('./res/Monkey_OBJ/MonkeyOBJ.obj')}
            position={[0, 0, -1]}
            scale={[.0025, .0025, .0025]}
            rotation={[0, 0, 0]}
            type="OBJ"
            visible={this.state.visibility}
            // dragType="FixedDistance" onDrag={()=>{}} // allows user to drag 3D object around with finger
          />

          <ViroText text="CODE: MONKEYBUSINESS" scale={[.1, .1, .1]} height={1} width={4} position={[0, -.1, -0.9]} visible={this.state.visibility} style={styles.helloWorldTextStyle} />
          
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      // only show if in range of recycling center
      if (RClatitude - latitudeDelta <= this.state.user.latitude && this.state.user.latitude <= RClatitude + latitudeDelta &&
        RClongitude - longitudeDelta <= this.state.user.longitude && this.state.user.longitude <= RClongitude + longitudeDelta) {
        this.setState({
          text : "Thanks for recycling!",
          visibility: true
        });
      } 
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
