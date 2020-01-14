import React, { Component } from "react";
import { View, Image, Text, ImageBackground } from "react-native";
import axios from "axios";

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherObj: "",
      fahrenheit: "",
      minTemp: "",
      maxTemp: "",
      sunrise: "",
      sunset: "",
      currentTime: "",
      forecast: ''
    };
  }
  componentDidMount = () => {
    this.getCurrentWeather();
    this.getForecast()
    // console.log('hit')
  };

  getCurrentWeather = async () => {
    await axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=Sandy,us&APPID=1b8d42a0a11b13b1e993848c6cfbe5f6"
      )
      .then(res => {
        this.setState({
          weatherObj: res.data
        });
        console.log(this.state.weatherObj);
      });
    await this.convertToFahren();
    await this.maxTemp();
    await this.minTemp();
    await this.sunrise();
    await this.sunset();
  };

  getForecast = async () => {
    await axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast?lat=40.57&lon=-111.86&APPID=1b8d42a0a11b13b1e993848c6cfbe5f6"
      )
      .then(res => {
        this.setState({
          forecast: res.data
        });
        console.log(this.state.forecast);
      });
  };

  convertToFahren = () => {
    const celsius = this.state.weatherObj.main.temp - 273;
    let fahrenheit = Math.floor(celsius * (9 / 5) + 32);
    this.setState({
      fahrenheit
    });
  };

  minTemp = () => {
    const celsius = this.state.weatherObj.main.temp_min - 273;
    let minTemp = Math.floor(celsius * (9 / 5) + 32);
    this.setState({
      minTemp
    });
  };

  maxTemp = () => {
    const celsius = this.state.weatherObj.main.temp_max - 273;
    let maxTemp = Math.floor(celsius * (9 / 5) + 32)
    console.log(Math.floor((this.state.weatherObj.main.temp_max - 273) * (9 / 5) + 32))
    this.setState({
      maxTemp
    });
  };

  sunrise = () => {
    var d = new Date(+this.state.weatherObj.sys.sunrise * 1000); // The 0 there is the key, which sets the date to the epoch
    let time = d.toLocaleTimeString([], { timeStyle: "short" });
    this.setState({ sunrise: time });
  };

  sunset = () => {
    var d = new Date(+this.state.weatherObj.sys.sunset * 1000); // The 0 there is the key, which sets the date to the epoch
    let time = d.toLocaleTimeString([], {hour: 'numeric', minute: '2-digit', hour12: true});
    this.setState({ sunset: time });
  };

  render() {
    const current = this.state.weatherObj;
    const {forecast} = this.state
    // console.log(this.state.timeStamp);
    return (
        
        <View
        style={{
            margin: "auto",
            marginTop: 30,
            justifyContent: "center",
            alignItems: "center",
            width: '100%'
        }}
        >
        {/* <ImageBackground source={{uri: 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}} style={{width: '100%', height: '100%', position: 'absolute' }}></ImageBackground> */}
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            color: "white",
            fontSize: 40
          }}
        >
          {this.state.weatherObj ? current.name : null}
        </Text>
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            color: "white",
            fontSize: 20
          }}
        >
          {this.state.weatherObj
            ? current.weather[0].description
                .toLowerCase()
                .split(" ")
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")
            : null}
        </Text>
              <Text
                style={{
                  marginTop: 10,
                  textAlign: "center",
                  color: "white",
                  fontSize: 70
                }}
              >
                {this.state.weatherObj ? this.state.fahrenheit + "°" : null}
              </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
        <Text style={{ marginTop: 10, textAlign: "center", color: "white"}}>
          {this.state.weatherObj ? "Low  " + this.state.minTemp + "°  " : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.weatherObj ? "/  " + this.state.maxTemp + "°  High" : null}
        </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20
          }}
        >

        <Text style={{ marginTop: 10, textAlign: "center", color: "white", marginBottom: 8 }}>
          {this.state.weatherObj ? this.state.sunrise + " " : null}
        </Text>
        <Image
                source={{
                  uri: 'https://cdn1.iconfinder.com/data/icons/weather-status-flat-1/64/weather-30-512.png'
                }}
                style={{
                  height: 50,
                  width: 50,
                  margin: "auto",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              />
        <Text style={{ marginTop: 10, textAlign: "center", color: "white", marginBottom: 8 }}>
          {this.state.weatherObj ? " " + this.state.sunset : null}
        </Text>
        </View>
        <View style={{ margin: "auto", width: '100%', justifyContent: "space-around", flexDirection: 'row' }}>
        <Text style={{ marginTop: 10, color: "white", marginBottom: 10 }}>
          {this.state.forecast ? new Date(+forecast.list[0].dt * 1000).toLocaleTimeString([], { dateStyle: "medium" }) : null}
        </Text>
            {this.state.forecast ? (
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${forecast.list[0].weather[0].icon}.png`
                }}
                style={{
                  height: 40,
                  width: 40,
                  margin: "auto",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              />
            ) : null}
            <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
        <Text style={{ marginTop: 10, textAlign: "center", color: "white"}}>
          {this.state.forecast ? Math.floor((this.state.forecast.list[0].main.temp_min - 273) * (9 / 5) + 32) + "°  " : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.forecast ? "/  " + Math.floor((this.state.forecast.list[0].main.temp_max - 273) * (9 / 5) + 32) + "°" : null}
        </Text>
        </View>
          </View>
        <View style={{ margin: "auto", width: '100%', justifyContent: "space-around", flexDirection: 'row' }}>
        <Text style={{ marginTop: 10, color: "white", marginBottom: 10 }}>
          {this.state.forecast ? new Date(+forecast.list[8].dt * 1000).toLocaleTimeString([], { dateStyle: "medium" }) : null}
        </Text>
            {this.state.forecast ? (
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${forecast.list[8].weather[0].icon}.png`
                }}
                style={{
                  height: 40,
                  width: 40,
                  margin: "auto",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              />
            ) : null}
            <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
        <Text style={{ marginTop: 10, textAlign: "center", color: "white"}}>
          {this.state.forecast ? Math.floor((this.state.forecast.list[8].main.temp_min - 273) * (9 / 5) + 32) + "°  " : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.forecast ? "/  " + Math.floor((this.state.forecast.list[8].main.temp_max - 273) * (9 / 5) + 32) + "°" : null}
        </Text>
        </View>
          </View>

        <View style={{ margin: "auto", width: '100%', justifyContent: "space-around", flexDirection: 'row' }}>
        <Text style={{ marginTop: 10, color: "white", marginBottom: 10 }}>
          {this.state.forecast ? new Date(+forecast.list[16].dt * 1000).toLocaleTimeString([], { dateStyle: "medium" }) : null}
        </Text>
            {this.state.forecast ? (
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${forecast.list[16].weather[0].icon}.png`
                }}
                style={{
                  height: 40,
                  width: 40,
                  margin: "auto",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              />
            ) : null}
            <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
        <Text style={{ marginTop: 10, textAlign: "center", color: "white"}}>
          {this.state.forecast ? Math.floor((this.state.forecast.list[16].main.temp_min - 273) * (9 / 5) + 32) + "°  " : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.forecast ? "/  " + Math.floor((this.state.forecast.list[16].main.temp_max - 273) * (9 / 5) + 32) + "°" : null}
        </Text>
        </View>
          </View>


        <View style={{ margin: "auto", width: '100%', justifyContent: "space-around", flexDirection: 'row' }}>
        <Text style={{ marginTop: 10, color: "white", marginBottom: 10 }}>
          {this.state.forecast ? new Date(+forecast.list[24].dt * 1000).toLocaleTimeString([], { dateStyle: "medium" }) : null}
        </Text>
            {this.state.forecast ? (
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${forecast.list[24].weather[0].icon}.png`
                }}
                style={{
                  height: 40,
                  width: 40,
                  margin: "auto",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              />
            ) : null}
            <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
        <Text style={{ marginTop: 10, textAlign: "center", color: "white"}}>
          {this.state.forecast ? Math.floor((this.state.forecast.list[24].main.temp_min - 273) * (9 / 5) + 32) + "°  " : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.forecast ? "/  " + Math.floor((this.state.forecast.list[24].main.temp_max - 273) * (9 / 5) + 32) + "°" : null}
        </Text>
        </View>
          </View>

        <View style={{ margin: "auto", width: '100%', justifyContent: "space-around", flexDirection: 'row' }}>
        <Text style={{ marginTop: 10, color: "white", marginBottom: 10 }}>
          {this.state.forecast ? new Date(+forecast.list[32].dt * 1000).toLocaleTimeString([], { dateStyle: "medium" }) : null}
        </Text>
            {this.state.forecast ? (
              <Image
                source={{
                  uri: `http://openweathermap.org/img/w/${forecast.list[32].weather[0].icon}.png`
                }}
                style={{
                  height: 40,
                  width: 40,
                  margin: "auto",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              />
            ) : null}
            <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
        <Text style={{ marginTop: 10, textAlign: "center", color: "white"}}>
          {this.state.forecast ? Math.floor((this.state.forecast.list[32].main.temp_min - 273) * (9 / 5) + 32) + "°  " : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.forecast ? "/  " + Math.floor((this.state.forecast.list[32].main.temp_max - 273) * (9 / 5) + 32) + "°" : null}
        </Text>
        </View>
          </View>
      </View>
    );
  }
}

export default Forecast;
