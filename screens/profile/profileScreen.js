import React, { Component } from "react";
import {
  SafeAreaView,
  BackHandler,
  View,
  StatusBar,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Sizes, Fonts } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

class ProfileScreen extends Component {
  componentDidMount() {
    console.log("hellloooo");
    this.getdata();
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
  state = {
    username: "",
    email: "",
  };

  getdata() {
    return axios
      .get("http://192.168.11.100:5000/user/profil")
      .then((res) => {
        console.log(res.data, "===================================>");
      })
      .catch((err) => {
        console.log(err, "===================================>");
      });
  }

  handleBackButton = () => {
    this.props.navigation.pop();
    return true;
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          {this.header()}
          {this.userInfo()}
        </View>
      </SafeAreaView>
    );
  }

  userInfo() {
    return (
      <>
        <View style={{ marginVertical: Sizes.fixPadding * 3.0 }}>
          <Image
            source={require("../../assets/images/user/user_5.jpg")}
            style={styles.userImageStyle}
          />
          <Text
            style={{
              textAlign: "center",
              ...Fonts.blackColor18Bold,
              marginTop: Sizes.fixPadding,
            }}
          >
            Ellison Perry
          </Text>
        </View>
        {this.info({ title: "Phone Number", value: "52049969" })}
        {this.info({ title: "Email", value: "ellison@test.com" })}
      </>
    );
  }

  info({ title, value }) {
    return (
      <View
        style={{
          marginHorizontal: Sizes.fixPadding * 2.0,
          marginBottom: Sizes.fixPadding + 5.0,
        }}
      >
        <Text style={{ ...Fonts.blackColor16Bold }}>{title}</Text>
        <Text
          style={{
            ...Fonts.grayColor14Medium,
            marginTop: Sizes.fixPadding - 5.0,
            marginBottom: Sizes.fixPadding,
          }}
        >
          {value}
        </Text>
        <View style={{ backgroundColor: Colors.grayColor, height: 0.8 }} />
      </View>
    );
  }

  header() {
    return (
      <View style={styles.headerWrapStyle}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color={Colors.blackColor}
          onPress={() => this.props.navigation.pop()}
        />
        <Text style={{ ...Fonts.blackColor18Bold }}>Profile</Text>
        <MaterialIcons
          name="edit"
          size={24}
          color={Colors.blackColor}
          onPress={() => this.props.navigation.push("EditProfile")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    height: 50.0,
    paddingHorizontal: Sizes.fixPadding * 2.0,
  },
  userImageStyle: {
    height: 100.0,
    width: 100.0,
    borderRadius: 50.0,
    alignSelf: "center",
  },
});

ProfileScreen.navigationOptions = () => {
  return {
    header: () => null,
  };
};

export default withNavigation(ProfileScreen);
