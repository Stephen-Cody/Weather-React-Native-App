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
    return (
      // <View style={styles.container}>
      //   <ScrollView
      //     style={styles.container}
      //     contentContainerStyle={styles.contentContainer}>
      //     <View style={styles.welcomeContainer}>
      //       <Image
      //         source={
      //           __DEV__
      //             ? require('../assets/images/robot-dev.png')
      //             : require('../assets/images/robot-prod.png')
      //         }
      //         style={styles.welcomeImage}
      //       />
      //     </View>
      // <View style={styles.container}>
      <>
      {this.state.uri  ? (<ImageBackground
        source={{uri: this.state.uri}}
        style={{ width: "100%", height: "100%" }}
      >
        <View
        style={{marginTop: 100}}
        >
        <Forecast 
          lat = {this.state.lat}
          lon = {this.state.lon}
        />
        </View>
      </ImageBackground>) : null }
      </>
      // </View>

      //         <View style={styles.getStartedContainer}>
      //           <DevelopmentModeNotice />

      //           <Text style={styles.getStartedText}>Get started by opening</Text>

      //           <View
      //             style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
      //             <MonoText>screens/HomeScreen.js</MonoText>
      //           </View>

      //           <Text style={styles.getStartedText}>
      //             NEW Text
      //           </Text>
      //         </View>

      //         <View style={styles.helpContainer}>
      //           <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
      //             <Text style={styles.helpLinkText}>
      //               Help, it didn’t automatically reload!
      //             </Text>
      //           </TouchableOpacity>
      //         </View>
      //       </ScrollView>

      //       <View style={styles.tabBarInfoContainer}>
      //         <Text style={styles.tabBarInfoText}>
      //           hello
      //         </Text>

      //         <View
      //           style={[styles.codeHighlightContainer, styles.navigationFilename]}>
      //           <MonoText style={styles.codeHighlightText}>
      //             navigation/MainTabNavigator.js
      //           </MonoText>
      //         </View>
      //       </View>
      //     </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
