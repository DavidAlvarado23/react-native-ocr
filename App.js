import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

const App = () => {
  const camera = useRef(null);
  const [ocrElements, setOcrElements] = useState([]);

  const onTextRecognized = ({textBlocks}) => {
    const elements = [];
    textBlocks.forEach((textBlock) => {
      textBlock.components.forEach((textLine) => {
        elements.push({
          bounds: textLine.bounds,
          text: textLine.value,
        });
      });
    });

    setOcrElements(elements);
  };

  const renderOcrElement = (element, key) => (
    <View
      style={{...styles.textElement, top: element.bounds.origin.y}}
      key={key}>
      <Text>{element.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <RNCamera
        ref={camera}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onTextRecognized={onTextRecognized}>
        {ocrElements &&
          ocrElements.map((element, i) => renderOcrElement(element, i))}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  textElement: {
    borderWidth: 1,
    borderColor: 'blue',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
  },
});

export default App;
