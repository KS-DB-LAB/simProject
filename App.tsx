import React from "react";

import SplashScreen from "./screens/SplashScreen";
// @ts-ignore
import NavigationScreen from "./screens/NavigationScreen"
import MainScreen from "./screens/MainScreen";
import LoginScreen from "./screens/LoginScreen";


export default class extends React.Component {
  state={
      isLoading : true
  };
  componentDidMount= async() => {
      setTimeout(() => {this.setState({isLoading: false})}, 3000);
  }

  render(){
      if(this.state.isLoading){
          return <SplashScreen/>
      }else{
          return <NavigationScreen/>;
      }
  }
}


