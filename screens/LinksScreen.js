import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Image} from "react-native";
import Cities from "../UScities.json";

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      filteredCities: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async (key, value) => {
    await this.setState({
      [key]: value
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

  render() {
    const cities = this.state.filteredCities.map((el, i) => {
      return (
        <View 
        key={i}
        style={{
          border: 1,
          borderBottomWidth: .5,
          borderColor: 'ghostwhite',
        }}
        >
          <TouchableOpacity>
          <Text
          style={{
            fontSize: 20,
            marginLeft:10,
            padding: 10,
            color: 'ghostwhite'
          }} 
          >{el}</Text>
          </TouchableOpacity>
        </View>
      )
    })
    return (
      <View style={{
        flex: 1,
        backgroundColor: "blue"
      }}>
        {/* <Image 
        source={{uri: "https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}}
        style={{
          flex: 1,
          resizeMode: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          justifyContent: 'center'
          
        }}>
        </Image> */}
          <TextInput
            placeholder="City Name"
            type="text"
            onChangeText={e => this.handleChange("search", e)}
            value={this.state.search}
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "ghostwhite",
              borderRadius: 5
            }}
            />
        <ScrollView style={styles.container}>
      {cities}
        </ScrollView>
      </View>
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
    backgroundColor: "#486B8D"
  }
});
