import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground} from "react-native";
import Cities from "../UScities.json";
import axios from 'axios';
import Forecast from "./Forecast";


export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredCities: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePress = this.handlePress.bind(this);

  }

  handleChange = async (key, value) => {
    await this.setState({
      [key]: value,
      city: '',
    });
    await this.filterCity()
  };

  filterCity = () => {
    let newArr = []
    if (this.state.search.length > 3) {
      let filterByValue = Cities.filter(o =>
         o.name.toLowerCase().includes(this.state.search.toLowerCase())
       );
       filterByValue.map(el => {
          newArr.push(el.name + " ")
        });
            this.setState({
              filteredCities: newArr,
            })
    } 
    if (this.state.search.length <= 3) {
      newArr = []
      this.setState({
        filteredCities: newArr
      })
    }
  }

  handlePress = (value) => {
    const city = value.split(' ').join('+')
    this.setState({
      city: city,
      search: "",
      filteredCities: [],
    })
  }

  render() {
    const cities = this.state.filteredCities.map((el, i) => {
      return (
        <View key={i}>
          <TouchableOpacity onPress={() => this.handlePress(el)} style={{borderRadius: 10}}>
          <Text 
            style={{
              fontSize: 30,
              backgroundColor: 'ghostwhite',
              borderWidth: 1,
              borderColor: '#d6d7da'
              }}>
              {el}
              </Text>
          </TouchableOpacity>
        </View>
      )
    })
    return (
        <ImageBackground 
          source={{uri: 'https://images.hdqwalls.com/download/clouds-summer-weather-5k-1b-2560x1440.jpg'}} 
          style={{width: '100%', height: '100%'}}
          >
      <ScrollView>
        <TextInput
          placeholder="City Name"
          type="text"
          onChangeText={e => this.handleChange("search", e)}
          value={this.state.search}
          style={{
            height: 30,
            backgroundColor: "ghostwhite",
            borderRadius: 10,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
          }}
        />
    <View style={{marginTop: 20}}>
      {cities}
    </View>
    {this.state.city ? (
      <View>
      <Forecast 
        city = {this.state.city}
        />
      </View>
    ) : null}
      </ScrollView>
    </ImageBackground>
    );
  }
}

LinksScreen.navigationOptions = {
  title: "Search By City"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "gray"
  }
})
