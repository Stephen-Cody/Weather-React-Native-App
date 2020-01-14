import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import Cities from "../UScities.json"


export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
    this.handleChange= this.handleChange.bind(this);
  }
    
  handleChange = (key, value) => {
    this.setState({
        [key]: value
    })
}
    
    render() {
      return (
        <ScrollView style={styles.container}>
        <Text>Test</Text>
        <TextInput
          placeholder="City Name" 
          type="text"
          onChangeText={e => this.handleChange('search', e)}
          value={this.state.search}
          style={{width: "100%", height: 30, backgroundColor: 'ghostwhite', borderRadius: 10 }}
        /> 
        </ScrollView>
    );
  }
}
  
  LinksScreen.navigationOptions = {
    title: 'Search By City',
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});


