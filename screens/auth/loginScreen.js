import React, { Component } from "react";
import axios from "axios";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  BackHandler,
  Animated,
  // AsyncStorage,
} from "react-native";
import { withNavigation } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Sizes, Fonts } from "../../constants/styles";

import { NavigationEvents } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(100);
  }
  
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
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
    return true;
  };

  _spring() {
    this.setState({ backClickCount: 1 }, () => {
      Animated.sequence([
        Animated.spring(this.springValue, {
          toValue: -0.05 * height,
          friction: 5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.springValue, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({ backClickCount: 0 });
      });
    });
  }

  state = {
    phoneNumber: "",
    backClickCount: 0,
    email: "",
    password: "",
  };

  login() {
    axios
      .post("http://192.168.22.169:5000/user/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.msg === "Logged in!") {
          // this.setState({isLoading:false})
          this.props.navigation.navigate("Verification");
          let storeData = async () => {
            try {
              await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
            } catch (error) {
              // Error saving data
              console.log(error);
            }
          };
          storeData();
        } else {
          Alert.alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
        <NavigationEvents
          onDidFocus={() => {
            BackHandler.addEventListener(
              "hardwareBackPress",
              this.handleBackButton.bind(this)
            );
          }}
        />
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
              {this.welcomeInfo()}
              {this.EmailTextField()}
              {this.PasswordTextField()}
              {this.continueButton()}
              {this.otpText()}
              {this.loginWithFacebookButton()}
              {this.loginWithGoogleButton()}
            </ScrollView>
          </LinearGradient>
        </ImageBackground>
        <Animated.View
          style={[
            styles.animatedView,
            { transform: [{ translateY: this.springValue }] },
          ]}
        >
          <Text style={{ ...Fonts.whiteColor14Medium }}>
            press back again to exit the app
          </Text>
        </Animated.View>
      </SafeAreaView>
    );
  }

  EmailTextField() {
    return (
      <TextInput
        value={this.state.email}
        onChange={() => {
          this.state.email;
          console.log(this.state.email);
        }}
        defaultCountry="IN"
        onChangeText={(email) => this.setState({ email })}
        style={styles.textFieldWrapStyle}
        placeholder="Email..."
        placeholderTextColor="white"
        dialCodeTextStyle={{
          ...Fonts.whiteColor14Medium,
          marginLeft: Sizes.fixPadding,
        }}
        containerStyle={{
          backgroundColor: "rgba(203, 189, 189, 0.73)",
          borderRadius: Sizes.fixPadding * 2.0,
          height: 56.0,
          marginTop: Sizes.fixPadding * 1.0,
        }}
      />
    );
  }
  PasswordTextField() {
    return (
      <TextInput
        value={this.state.password}
        onChange={() => {
          this.state.password;
          console.log(this.state.password);
        }}
        defaultCountry="IN"
        onChangeText={(password) => this.setState({ password })}
        style={styles.textFieldWrapStyle}
        placeholder="Password..."
        placeholderTextColor="white"
        secureTextEntry={true}
        dialCodeTextStyle={{
          ...Fonts.whiteColor14Medium,
          marginLeft: Sizes.fixPadding,
        }}
        containerStyle={{
          backgroundColor: "rgba(203, 189, 189, 0.73)",
          borderRadius: Sizes.fixPadding * 2.0,
          height: 56.0,
          marginTop: Sizes.fixPadding * 1.0,
        }}
      />
    );
  }

  loginWithGoogleButton() {
    return (
      <View style={styles.loginWithGoogleButtonStyle}>
        <Image
          source={require("../../assets/images/google.png")}
          style={{ height: 37.0, width: 37.0 }}
          resizeMode="cover"
        />
        <Text
          style={{
            ...Fonts.blackColor14Medium,
            marginLeft: Sizes.fixPadding + 5.0,
          }}
        >
          Log in with Google
        </Text>
      </View>
    );
  }

  loginWithFacebookButton() {
    return (
      <View style={styles.loginWithFacebookButtonStyle}>
        <Image
          source={require("../../assets/images/facebook.png")}
          style={{ height: 37.0, width: 37.0 }}
          resizeMode="cover"
        />
        <Text
          style={{
            ...Fonts.whiteColor14Medium,
            marginLeft: Sizes.fixPadding + 5.0,
          }}
        >
          Log in with Facebook
        </Text>
      </View>
    );
  }

  otpText() {
    return (
      <Text style={{ ...Fonts.whiteColor18Medium, textAlign: "center" }}>
        We’ll send otp for verification
      </Text>
    );
  }

  continueButton() {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          if (!this.state.email || !this.state.password) {
            alert("put all info");
          } else {
            if (this.state.email.indexOf("@") == -1) {
              alert("email must be correct");
            } else if (format.test(this.state.password) !== true) {
              alert("Password must includes Uppercase and Symboles");
            } else {
              this.login();
            }
          }
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["rgba(219, 24, 24, 1.0)", "rgba(219, 24, 24, 0.49)"]}
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Bold }}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  welcomeInfo() {
    return (
      <View
        style={{
          marginTop: Sizes.fixPadding * 8.0,
          marginBottom: Sizes.fixPadding * 4.0,
        }}
      >
        <Text style={{ ...Fonts.whiteColor36Bold }}>Welcome back</Text>
        <Text
          style={{
            ...Fonts.whiteColor14Medium,
            //marginTop: Sizes.fixPadding - 5.0
          }}
        >
          Login your account
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
  selectAreaModalStyle: {
    height: height * 0.5,
    width: width * 0.8,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
  },
  loginWithGoogleButtonStyle: {
    borderRadius: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    height: 56.0,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  loginWithFacebookButtonStyle: {
    borderRadius: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 6.0,
    marginBottom: Sizes.fixPadding * 2.5,
    backgroundColor: "#3B5998",
    flexDirection: "row",
    height: 56.0,
  },
  continueButtonStyle: {
    borderRadius: Sizes.fixPadding * 2.0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 0.0,
    marginBottom: Sizes.fixPadding * 2.0,
    height: 54.0,
  },
  searchCountryTextFieldContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
    borderBottomWidth: 1.0,
    borderBottomColor: Colors.grayColor,
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

LoginScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(LoginScreen);
