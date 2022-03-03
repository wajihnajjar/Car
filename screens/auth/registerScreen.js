import React, { Component } from "react";
import axios from "axios";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import IntlPhoneInput from "react-native-intl-phone-input";
class RegisterScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  handleBackButton = () => {
    this.props.navigation.push("Login");
    return true;
  };

  state = {
    username: "",
    email: "",
    password: "",
    number: "",
    alert: false,
  };
  changeview() {
    setState({
      alert: !this.alert,
    });
  }

  onSubmitFormHandler() {
    axios
      .post(`http://192.168.22.206:5000/user/signup`, {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        PhoneNumber: this.state.number,
      })
      .then((res) => {
        console.log("post done");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../../assets/images/bg.jpg")}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            colors={["black", "rgba(0,0.10,0,0.70)", "rgba(0,0,0,0.0)"]}
            style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.backArrow()}
              {this.registerInfo()}
              {this.userNameTextField()}
              {this.emailTextField()}
              {this.numberTextField()}
              {this.passwordTextField()}
              {this.continueButton()}
            </ScrollView>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    );
  }
  continueButton() {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (
            !this.state.username ||
            !this.state.email ||
            !this.state.password ||
            !this.state.number
          ) {
            alert("Please fill all required info");
          } else {
            if (this.state.email.indexOf("@") == -1) {
              alert("email must be correct");
            } else if (format.test(this.state.password) !== true) {
              alert("Password must include uppercase/symboles/number");
            } else if (this.state.username.length < 8) {
              alert("username must have at least 8 characters");
            } else {
              this.onSubmitFormHandler(
                this.props.navigation.push("Verification")
              );
            }
          }
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(253, 153, 2,1.2)", "rgba(253, 153, 2, 0.49)"]}
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  passwordTextField() {
    return (
      <TextInput
        value={this.state.password}
        onChange={() => {
          this.state.password;
          console.log(this.state.password);
        }}
        style={styles.textFieldWrapStyle}
        secureTextEntry={true}
        onChangeText={(text) => this.setState({ password: text })}
        placeholder="Password"
        placeholderTextColor="white"
      />
    );
  }

  emailTextField() {
    return (
      <TextInput
        value={this.state.email}
        onChange={() => {
          this.state.email;
          console.log(this.state.email);
        }}
        style={styles.textFieldWrapStyle}
        onChangeText={(text) => this.setState({ email: text })}
        placeholder="Email"
        placeholderTextColor="white"
      />
    );
  }
  numberTextField() {
    return (
      <IntlPhoneInput
        defaultCountry="TN"
        value={this.state.number}
        onChange={() => {
          this.state.number;
          console.log(this.state.number);
        }}
        style={styles.textFieldWrapStyle}
        onChangeText={(text) => this.setState({ number: text })}
        placeholder="Your Number"
        placeholderTextColor="white"
      />
    );
  }

  userNameTextField() {
    return (
      <TextInput
        value={this.state.username}
        onChange={() => {
          this.state.username;
          console.log(this.state.username);
        }}
        style={styles.textFieldWrapStyle}
        onChangeText={(text) => this.setState({ username: text })}
        placeholder="Username"
        placeholderTextColor="white"
      />
    );
  }

  backArrow() {
    return (
      <MaterialIcons
        name="arrow-back"
        size={24}
        color={Colors.whiteColor}
        style={{
          marginTop: Sizes.fixPadding * 7.0,
          marginBottom: Sizes.fixPadding,
        }}
        onPress={() => this.props.navigation.push("Login")}
      />
    );
  }

  registerInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 3.0,
          marginBottom: Sizes.fixPadding * 4.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor36Bold }}>Register</Text>
        <Text
          style={{
            ...Fonts.whiteColor14Medium,
          }}
        >
          Create account
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textFieldWrapStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 60.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: "rgba(203, 189, 189, 0.73)",
    borderRadius: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.5,
    ...Fonts.whiteColor14Medium,
  },
  continueButtonStyle: {
    borderRadius: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding + 10.0,
    height: 56.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
});

RegisterScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(RegisterScreen);
