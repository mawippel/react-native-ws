import React, { Component } from 'react';
import axios from 'axios'
import { StyleSheet, Text, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';

export default class App extends Component {

  state = {
    breeds: null
  }

  async componentDidMount() {
    try {
      let breeds = await axios.get('https://dog.ceo/api/breed/pinscher/images')
      if (breeds.data.message) {
        this.setState({ breeds: breeds.data.message });
        await this.storeData();
        await this.getKey();
      }
    } catch (error) {
      console.error(error)
    }
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('@BeatifulPinschers', `${this.state.breeds[0]}`);
    } catch (error) {
      console.log()
    }
  };

  getKey = async () => {
    try {
      const value = await AsyncStorage.getItem('@BeatifulPinschers');
      this.setState({myKey: value});
      console.log(this.state.myKey);
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  }

  render() {
    if (!this.state.breeds) {
      return <ActivityIndicator size="large" color="#0000ff" />
    }
    return (
      <ScrollView style={styles.container}>
        <Text style={{textAlign:'center'}}>FOTOS DE PINSCHER</Text>
        {this.state.breeds.map((b, index) => {
          return (<Text key={index}>{b}</Text>)
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#F5FCFF'
  },
});
