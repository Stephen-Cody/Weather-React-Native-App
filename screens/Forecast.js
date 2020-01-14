import React, { Component } from "react";
import { View, Image, Text } from "react-native";
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
      currentTime: ""
    };
  }
  componentDidMount = () => {
    this.getWeather();
    // console.log('hit')
  };

  getWeather = async () => {
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
    let maxTemp = Math.floor(celsius * (9 / 5) + 32);
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
    let time = d.toLocaleTimeString([], { timeStyle: "short" });
    this.setState({ sunset: time });
  };

  render() {
    const current = this.state.weatherObj;
    console.log(this.state.timeStamp);
    return (
      <View
        style={{
          margin: "auto",
          marginTop: 50,
          textAlign: "center",
          color: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            marginTop: 10,
            textAlign: "center",
            color: "white",
            fontSize: 30
          }}
        >
          {this.state.weatherObj ? current.name : null}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ marginTop: 10, textAlign: "center", color: "white", fontSize: 50 }}>
              {this.state.weatherObj ? this.state.fahrenheit + "°" : null}
            </Text>
            <View style={{ margin: "auto" }}>
              {this.state.weatherObj ? (
                <Image
                  source={{uri: `http://openweathermap.org/img/w/${current.weather[0].icon}.png`}}
                  style={{ height: 50, width: 50, margin: "auto", alignItems: 'center', justifyContent: 'center' }}
                />
              ) : null}
            </View>
        </View>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.weatherObj ? current.weather[0].description : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.weatherObj ? "Low " + this.state.minTemp : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.weatherObj ? "High " + this.state.maxTemp : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.weatherObj ? "Sunrise " + this.state.sunrise : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.weatherObj ? "Sunset " + this.state.sunset : null}
        </Text>
        {/* <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.weatherObj ? current.weather[0].main : null}
        </Text>
        <Text style={{ marginTop: 10, textAlign: "center", color: "white" }}>
          {this.state.weatherObj ? current.weather[0].main : null}
        </Text> */}
      </View>
    );
  }
}

export default Forecast;
