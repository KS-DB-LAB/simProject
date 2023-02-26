import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./screens/SplashScreen";
// @ts-ignore
import NavigationScreen from "./screens/NavigationScreen"

import 'react-native-url-polyfill/auto';;


export default class extends React.Component {
  state={
      isLoading : true
  };
  componentDidMount= async() => {
      setTimeout(() => {this.setState({isLoading: false})}, 3000);
  }




  render() {

        if (this.state.isLoading) {
            return <SplashScreen/>
        }
        else {
            return <NavigationScreen/>;
        }
    }
}


