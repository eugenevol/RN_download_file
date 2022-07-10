import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';


// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

// const uri = "http://techslides.com/demos/sample-videos/small.mp4"

export default function App() {


  function downloadFile(){
    const uri = "https://muzati.net/music/0-0-1-18657-20"
    let fileUri = FileSystem.documentDirectory + "small.mp4";
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        saveFile(uri);
        console.log(uri)
      })
      .catch(error => {
        console.error(error);
      })
}

let saveFile = async (fileUri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
    else{
      console.log('Not granted')
    }
}

downloadFile()

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
      <Card>
        <AssetExample />
      </Card>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
