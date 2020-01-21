import * as WebBrowser from "expo-web-browser";
import React from "react";
import axios from "axios";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";

import { MonoText } from "../components/StyledText";
import Forecast from "./Forecast";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: "",
      uri: ""
    };
  }

  componentDidMount = async () => {
    await this.findCoordinates();
    // console.log('hit')
  };

  
  findCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      async position => {

        await this.setState({ location: position });
        await this.setState({
          lat: this.state.location.coords.latitude,
          lon: this.state.location.coords.longitude,
        })
        await this.getCurrentWeather();
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  getCurrentWeather = async () => {
    let lat = this.state.lat
    let lon = this.state.lon
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=1b8d42a0a11b13b1e993848c6cfbe5f6`
      )
      .then(res => {
        // console.log(res)
        this.setState({
          currentWeather: res.data.weather[0].main
        });
        // console.log(this.state.currentWeather);
      });
    await this.setBackground();
  };

  setBackground = () => {
    // console.log(this.state.currentWeather)
    if (this.state.currentWeather === "Clouds") {
      this.setState({ 
        uri: "http://getwallpapers.com/wallpaper/full/4/f/4/564402.jpg" 
      });
    } else if (this.state.currentWeather === "Rain") {
      this.setState({
        uri: "http://getwallpapers.com/wallpaper/full/4/f/4/564402.jpg"
      });
    } else if (this.state.currentWeather === "Thunderstorm") {
      this.setState({
        uri: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      });
    } else if (this.state.currentWeather === "Drizzle") {
      this.setState({
        uri: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      });
    } else if (this.state.currentWeather === "Snow") {
      this.setState({
        uri: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      });
    } else if (this.state.currentWeather === "Clouds") {
      this.setState({
        uri: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      });
    } else if (this.state.currentWeather === "Clear") {
      this.setState({
        uri: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      });
    } else {
      this.setState({
        uri: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      });
    }
  };

  render() {
    const apiKey = "1b8d42a0a11b13b1e993848c6cfbe5f6";
    const example =
      "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1b8d42a0a11b13b1e993848c6cfbe5f6";
    const topMargin = (Platform.OS == 'android') ? <View style={{marginTop: 32}}></View> : <View style={{marginTop: 100}}></View>
    return (
      <>
      <ScrollView>
      {this.state.uri  ? (<ImageBackground
        source={{uri: this.state.uri}}
        style={{ width: "100%", height: "100%" }}
      >
        {topMargin}
        {/* <View
        style={{
          marginTop: 32,
          marginBottom: 20
        }}
        > */}
        <Forecast 
          lat = {this.state.lat}
          lon = {this.state.lon}
        />
        {/* </View> */}
      </ImageBackground>) : null }
      <View style={{marginBottom: 20}}/>
      </ScrollView>
      </>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};



