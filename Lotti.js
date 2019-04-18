import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

import anim from './assets/splash.json';

export default class lottieloader extends Component {
     state = {
          animation: null,
     };
      
     componentWillMount() {
          console.log("lotti play ")
          this._playAnimation();
     }

     _playAnimation = () => {
          if (!this.state.animation) {
            this._loadAnimationAsync();
          } else {
            this.animation.reset();
            this.animation.play();
          }
        };

        _loadAnimationAsync = async () => {
          // let result = await fetch(
          //   'https://cdn.rawgit.com/airbnb/lottie-react-native/635163550b9689529bfffb77e489e4174516f1c0/example/animations/Watermelon.json'
          // )
          //   .then(data => {
          //     return data.json();
          //   })
          //   .catch(error => {
          //     console.error(error);
          //   });
          this.setState({ animation: anim }, this._playAnimation);
        };

        render() {
          return (
            <View style={styles.animationContainer}>
              <Text style={styles.title}>simple TODO</Text>
              {this.state.animation &&
                <Lottie
                  ref={animation => {
                    this.animation = animation;
                  }}
                  style={{
                    width: 400,
                    height: 400,
                    //backgroundColor: '#eee',
                  }}
                  source={this.state.animation}
                />}
              {/* <View style={styles.buttonContainer}>
                <Button title="Restart Animation" onPress={this._playAnimation} />
              </View> */}
            </View>
          );
        }
}

const styles = StyleSheet.create({
     animationContainer: {
       alignItems: 'center',
       justifyContent: 'center',
       flex: 1,
       marginBottom:70
     },
   });
   