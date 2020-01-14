import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
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
        <View key={i}>
          <TouchableOpacity>
          <Text>{el}</Text>
          </TouchableOpacity>
        </View>
      )
    })
    return (
      <ScrollView style={styles.container}>
        <Text>Test</Text>
        <TextInput
          placeholder="City Name"
          type="text"
          onChangeText={e => this.handleChange("search", e)}
          value={this.state.search}
          style={{
            width: "100%",
            height: 30,
            backgroundColor: "ghostwhite",
            borderRadius: 10
          }}
        />
    {cities}
      </ScrollView>
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
    backgroundColor: "#fff"
  }
});
