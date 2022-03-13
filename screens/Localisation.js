import React, { Component  } from "react";
import {
  SafeAreaView,
    View,
  StyleSheet,
  Button,
} from "react-native";
import {Picker} from '@react-native-community/picker'
import { Colors, Sizes } from "../constants/styles";
import { WebView } from "react-native-webview";
import * as Location from 'expo-location';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function NotificationScreen({ navigation }) {
  const { errorMsg, setErrorMsg } = React.useState('')
  const [longitude, setLongitude] = React.useState('')
  const [id, setId] = React.useState('')
  const [latitude, setLatitude] = React.useState('')
  const [selectedValue, setSelectedValue] = React.useState("your location");
  const MAP =
    "https://www.google.com/maps/dir/36.8943296,10.1855716,17/36.8800831,10.1838411/@3.8861199,10.1838411,15.66z";
  React.useEffect(() => {
    (
      Location.requestForegroundPermissionsAsync().then(({ status }) => {
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }   
      }).catch(() => { }).then(() => {
        Location.getCurrentPositionAsync({}).catch(() => { }).then((location) => {
          setLongitude(location.coords.longitude);
          setLatitude(location.coords.latitude);
        })                                           
      }).then(()=>{AsyncStorage.getItem('key').then((d)=>{setId(JSON.parse(d).id)}).catch(err=>console.log(err))})
       .catch(err => { console.log(err) })
      
      );
  }, []);
  const state = (x) => {
    AsyncStorage.setItem('state',x).then(()=>{navigation.navigate("navbar") }).catch(err=>console.log(err))
     }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <View style={{ width: 420, height: 740 }}>
        <WebView source={{ uri: MAP }} onLoad={
                
console.log("loaded")
         } />
        <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
        setSelectedValue(itemValue)
        axios
          .put(`http://192.168.11.6:5000/state/${id}`, { state: itemValue })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
        }
      }
      >
        <Picker.Item label="Choose your state" value="Choose your state" />
        <Picker.Item label="Ariana" value="Ariana" />
        <Picker.Item label="Beja" value="Beja" />
        <Picker.Item label="Ben Arous" value="Ben Arous" />
        <Picker.Item label="Bizerte" value="Bizerte" />
        <Picker.Item label="Gabes" value="Gabes" />
        <Picker.Item label="Gafsa" value="Gafsa" />
        <Picker.Item label="Jendouba" value="Jendouba" />
        <Picker.Item label="Kairouan" value="Kairouan" />
        <Picker.Item label="Kasserine" value="Kasserine" />
        <Picker.Item label="Kebili" value="Kebili" />
        <Picker.Item label="Kef" value="Kef" />
        <Picker.Item label="Mahdia" value="Mahdia" />
        <Picker.Item label="Manouba" value="Manouba" />
        <Picker.Item label="Medenine" value="Medenine" />
        <Picker.Item label="Monastir" value="Monastir" />
        <Picker.Item label="Nabeul" value="Nabeul" />
        <Picker.Item label="Sfax" value="Sfax" />
        <Picker.Item label="Sidi Bouzid" value="Sidi Bouzid" />
        <Picker.Item label="Siliana" value="Siliana" />
        <Picker.Item label="Sousse" value="Sousse" />
        <Picker.Item label="Tataouine" value="Tataouine" />
        <Picker.Item label="Tozeur" value="Tozeur" />
        <Picker.Item label="Tunis" value="Tunis" />
        <Picker.Item label="Zaghouan" value="Zaghouan" />
      </Picker>
      <Button
            title="Proceed to order "
            onPress={() => state(selectedValue)}
          />
      </View>
      <View style={{ marginTop: 420, width: 100 }}>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerInfoWrapStyle: {
    flexDirection: "row",
    paddingLeft: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartItemCountWrapStyle: {
    position: "absolute",
    right: -8.0,
    height: 17.0,
    width: 17.0,
    borderRadius: 8.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.redColor,
    elevation: 10.0,
  },
  searchButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginTop: Sizes.fixPadding + 5.0,
  },
});