/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  Animated,
  PanResponder,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';


const VideoContainer = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  const [paused, setPaused] = useState(true)
  const togglePlay = () => {
    setPaused(!paused)
  }

  return (
    <View style={styles.vidContainer}>
      <Animated.View
        style={[{
          ...styles.videoHandler,
          top: pan.y,
          left: pan.x,
        }]}
        {...panResponder.panHandlers} 
      >
        <Video source={{
          uri: "https://hls.ted.com/project_masters/3875/manifest.m3u8",
          type: 'm3u8'
        }}
          paused={paused}
          style={styles.backgroundVideo} 
          controls={true}
        />
       </Animated.View>
    </View>
  )
}

const App = () => {
  const [isVideoToggle, setIsVideoToggle] = useState(false);

  const toggleVids = () => {
    setIsVideoToggle(!isVideoToggle)
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <View
        style={styles.vidContainer}
      >
        {!isVideoToggle ? (
          <TouchableOpacity style={styles.button} onPress={toggleVids}>
            <Text style={styles.buttonTxt}>See Videos</Text>
          </TouchableOpacity>
        ) : (
          <VideoContainer />
        )}
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    height: 50,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonTxt: {
    fontSize: 20,
    color: 'white',
    fontWeight: "600",
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  vidContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoHandler: {
    width: 265,
    height: 150,
    zIndex:1,
    position:'absolute',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%'
  },
});

export default App;
