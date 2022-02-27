import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from "./components/loadingScreen";
import loginScreen from "./screens/auth/loginScreen";
import SplashScreen from "./screens/splashScreen";
import verificationScreen from "./screens/auth/verificationScreen";
import registerScreen from "./screens/auth/registerScreen";
import homeScreen from "./screens/home/homeScreen";
import serviceProviderScreen from "./screens/serviceProvider/serviceProviderScreen";
import selectCarScreen from "./screens/selectCar/selectCarScreen";
import addNewCarScreen from "./screens/addNewCar/addNewCarScreen";
import selectDateAndTimeScreen from "./screens/selectDatAndTime/selectDateAndTimeScreen";
import selectPaymentMethodScreen from "./screens/selectPaymentMethod/selectPaymentMethodScreen";
import profileScreen from "./screens/profile/profileScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import myBookingScreen from "./screens/myBooking/myBookingScreen";
import bookingDetailScreen from "./screens/bookingDetail/bookingDetailScreen";
import rateScreen from "./screens/rate/rateScreen";
import myCarsScreen from "./screens/myCars/myCarsScreen";
import favoritesScreen from "./screens/favorites/favoritesScreen";
import contactUsScreen from "./screens/contactUs/contactUsScreen";
import settingsScreen from "./screens/settings/settingsScreen";
import privacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import termsOfUseScreen from "./screens/termsOfUse/termsOfUseScreen";
import notificationsScreen from "./screens/notifications/notificationsScreen";
import myAddressesScreen from "./screens/myAddresses/myAddressesScreen";
import addNewAddressScreen from "./screens/addNewAddress/addNewAddressScreen";
import sos from "./screens/sos/sos";
const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Splash: SplashScreen,
  mainFlow: createStackNavigator(
    {
      Login: loginScreen,
      Verification: verificationScreen,
      Register: registerScreen,
      Home: homeScreen,
      ServiceProvider: serviceProviderScreen,
      SelectCar: selectCarScreen,
      AddNewCar: addNewCarScreen,
      SelectDateAndTime: selectDateAndTimeScreen,
      SelectPaymentMethod: selectPaymentMethodScreen,
      Profile: profileScreen,
      EditProfile: editProfileScreen,
      MyBooking: myBookingScreen,
      BookingDetail: bookingDetailScreen,
      Rate: rateScreen,
      MyCars: myCarsScreen,
      Favorites: favoritesScreen,
      ContactUs: contactUsScreen,
      Settings: settingsScreen,
      PrivacyPolicy: privacyPolicyScreen,
      TermsOfUse: termsOfUseScreen,
      Notifications: notificationsScreen,
      MyAddresses: myAddressesScreen,
      AddNewAddress: addNewAddressScreen,
      Sos: sos ,

    },
  ),
},
  {
    initialRouteName: 'Loading',
  });

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App />
  );
};





