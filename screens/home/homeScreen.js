import React, { useState, Component, useEffect } from "react";
import { Text, View, SafeAreaView,  AsyncStorage ,StatusBar, Animated, BackHandler, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import MenuDrawer from 'react-native-side-drawer';
import Dialog from "react-native-dialog";
import axios from 'axios'
import * as Location from 'expo-location';



var markers = [


    



];
var map = new Map()

const { width, height } = Dimensions.get('screen');

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.springValue = new Animated.Value(100);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();
        return true;
    };

    _spring() {
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(    
                    this.springValue,
                    {
                        toValue: -.05 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });
    }

    state = {
        backClickCount: 0,
        openDrawer: false,
        showLogoutDialog: false,
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <NavigationEvents onDidFocus={() => {
                    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
                }} />
                <MenuDrawer
                    open={this.state.openDrawer}
                    drawerContent={this.drawerContent()}
                    drawerPercentage={75}
                    animationTime={250}
                    opacity={0.5}
                    position="left"
                >
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.setState({ openDrawer: false })}
                    >
                        {this.header()}
                        <NearestPlaces props={this.props} />
                    </TouchableOpacity>
                </MenuDrawer>

                <Animated.View style={[styles.animatedView, { transform: [{ translateY: this.springValue }] }]}>
                    <Text style={{ ...Fonts.whiteColor14Medium }}>
                        press back again to exit the app
                    </Text>
                </Animated.View>
            </SafeAreaView>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="menu" size={24} color="black"
                    onPress={() => this.setState({ openDrawer: true })}
                    style={{ marginLeft: Sizes.fixPadding * 2.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Carhabty
                </Text>
                <MaterialIcons
                    name="notifications"
                    size={24}
                    color="black"
                    style={{ marginRight: Sizes.fixPadding * 2.0 }}
                    onPress={() => this.props.navigation.push('Notifications')}
                />
            </View>
        )
    }

    drawerContent = () => {
        return (
            <View style={styles.drawerStyle}>
                <View style={{
                    alignItems: 'center',
                    marginTop: Sizes.fixPadding + 10.0,
                    marginBottom: Sizes.fixPadding * 3.0
                }}>
                    <Image
                        source={require('../../assets/images/user.jpg')}
                        style={{
                            width: 100.0,
                            height: 100.0,
                            borderRadius: 50.0,
                        }}
                    />
                    <Text style={{ ...Fonts.blackColor14Regular, marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding - 5.0 }}>
                        Hamid kacem
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { this.props.navigation.push('Profile') }}
                    >
                        <Text style={{ ...Fonts.grayColor12MediumItalic }}>
                            View Profile
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { this.props.navigation.push('Home') }}
                    style={{ ...styles.drawerItemStyle, marginTop: Sizes.fixPadding - 5.0 }}>
                    <MaterialIcons name="home" size={24} color={Colors.blackColor} />
                    <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding * 2.0, }}>
                        Home
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { this.props.navigation.push('MyBooking') }}
                    style={{ ...styles.drawerItemStyle, marginTop: Sizes.fixPadding - 5.0 }}>
                    <MaterialIcons name="security" size={24} color={Colors.blackColor} />
                    <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding * 2.0, }}>
                        My Bookings
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { this.props.navigation.push('MyCars') }}
                    style={{ ...styles.drawerItemStyle }}>
                    <MaterialIcons name="directions-car" size={24} color={Colors.blackColor} />
                    <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding * 2.0 }}>MyCars</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { this.props.navigation.push('Favorites') }}
                    style={{ ...styles.drawerItemStyle }}>
                    <MaterialIcons name="favorite" size={24} color={Colors.blackColor} />
                    <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding * 2.0 }}>
                        Favorites
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { this.props.navigation.push('MyAddresses') }}
                    style={{ ...styles.drawerItemStyle }}>
                    <MaterialIcons name="location-on" size={24} color={Colors.blackColor} />
                    <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding * 2.0 }}>
                        My Address
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { this.props.navigation.push('ContactUs') }}
                    style={{ ...styles.drawerItemStyle }}>
                    <MaterialIcons name="email" size={24} color={Colors.blackColor} />
                    <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding * 2.0 }}>
                        Contact us
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { this.props.navigation.push('Settings') }}
                    style={{ ...styles.drawerItemStyle }}>
                    <MaterialIcons name="settings" size={24} color={Colors.blackColor} />
                    <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding * 2.0 }}>
                        Settings
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showLogoutDialog: true })}
                    style={styles.logoutWrapStyle}>
                    <MaterialIcons name="exit-to-app" size={24} color={Colors.primaryColor} />
                    <Text style={{ ...Fonts.primaryColor14Regular, marginLeft: Sizes.fixPadding * 2.0 }}>
                        Logout
                    </Text>
                </TouchableOpacity>
                {this.logOutDialog()}
            </View>
        );
    };

    logOutDialog() {
        return (
            <Dialog.Container
                visible={this.state.showLogoutDialog}
                contentStyle={styles.dialogStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Bold, paddingBottom: Sizes.fixPadding }}>
                        Are you sure want to logout?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ showLogoutDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor16Medium }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ showLogoutDialog: false })
                                this.props.navigation.push('Login')
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor16Medium }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }
}

const cardWidth = width / 1.5;

const NearestPlaces = ({ props }) => {

    var [markerList] = useState(markers);

    const [region] = useState(
        {
            latitude: 33.7931605 ,
            longitude: 9.5607653,
            latitudeDelta: 2.0043,
            longitudeDelta:2.0034,
        }
    );

    let all= {
        coordinate: {
            latitude: 0,
            longitude: 0,
        },
        place: '',
        address: '',
        rating: 0,
        distance: 0,
        cost: 0,


     }

    let mapAnimation = new Animated.Value(0);
    let mapIndex = 0;

    useEffect( () => {

 var lat = 0 
 var long = 0 
 _GetCord =  async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              setchange(true)
              setchange2(false)
              return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log(location.coords)
            lat = location.coords.latitude 
            long = location.coords.longitude
          }
_storeData = async ()=> {
await AsyncStorage.setItem("user_id","1")
}
_storeData()



function deg2rad(deg) {
            return deg * (Math.PI/180)
          }
          
         function  calcDistance(lat1 , lon1 , lat2,lon2 ) {

            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2-lat1);  // deg2rad below
            var dLon = deg2rad(lon2-lon1); 
            var a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2)
              ; 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c; // Distance in km
            return d;
          }

          function getLatLon(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
              console.log("Latitude is "+latitude);
              console.log("Longitude is "+longitude);
              console.log(latitude)
              console.log(longitude)
return [latitude , longitude]
            }
        async  function  fetchData(){
            var arr =[]
           await _GetCord()
            await axios.get("http://192.168.18.22:5000/admin/getAllMechanic").then(res=> {
            console.log(res.data.length)

          for (let i = 0 ; i< res.data.length ; i++)
          markers.push({ coordinate: {
            latitude: 0,
            longitude: 0,
        },
        place: '',
        address: '',
        rating: 0,
        distance: 0,
        cost: 0,
})
            for (var  i = 0 ;i< res.data.length;i ++){  
                console.log(res.data[i])
                markers[i].mechanic_id = res.data[i].mechanic_id       
             markers[i].place= res.data[i].namePlace ; 
                 markers[i].address=res.data[i].address 
                  var latitude = res.data[i].cordinate.substr(0,res.data[i].cordinate.substr(0,res.data[i].cordinate.indexOf(" "))) ; 
                  var longitude = res.data[i].cordinate.substr(res.data[i].cordinate.indexOf(' ')+1) 
                  markers[i].coordinate.latitude = parseFloat(latitude) 
                  markers[i].coordinate.longitude = parseFloat(longitude) 
                  var rate = (((res.data[i].stars/res.data[i].peopleCount).toFixed(2)))
                  markers[i].rating = rate 
                  markers[i].count = res.data[i].peopleCount
                  console.log(markers[i].count)
                   markers[i].peopleCount = res.data[i].peopleCount
                  markers[i].distance = (calcDistance(parseFloat(latitude) , parseFloat(longitude),lat  , long)).toFixed(2)
                markers[i].phone = res.data[i].phone
                  var x=  Math.floor(Math.random()*100) 
            }
            markerList.sort(function(a,b){ 
         return (b.rating-a.rating) + (a.distance-b.distance)


            })
         }).catch(err=> { 
                console.log(err)
            })
                    }
                    fetchData()
                console.log("Test")
            mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / cardWidth + 0.3);
            if (index >= markerList.length) {
                index = markerList.length;
            }
            if (index <= 0) {
                index = 0;
            }
            clearTimeout(regionTimeout);
            const regionTimeout = setTimeout(() => {
                if (mapIndex != index) {
                    mapIndex = index;
                    const { coordinate } = markerList[index];
                    _map.current.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        }, 350
                    )
                }
            }, 10);
        });
    },[]);

    const interpolation = markerList.map((marker, index) => {
        const inputRange = [
            (index - 1) * cardWidth,
            index * cardWidth,
            ((index + 1) * cardWidth),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp"
        })

        return { scale };
    })

    const _map = React.useRef(null);

    return (
        <View>
            <MapView
                ref={_map}
                initialRegion={
                    region
                }
                style={{ width: '100%', height: '100%' }}
                provider={PROVIDER_GOOGLE}
            >
                {markerList.map((marker, index) => {
                    const scaleStyle = {
                        transform: [
                            {
                                scale: interpolation[index].scale
                            }
                        ]
                    }
                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={marker.coordinate}
                        >
                            <Animated.View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 50.0, height: 50.0
                                }}
                            >
                                <Animated.Image
                                    source={require('../../assets/images/custom_marker.png')}
                                    resizeMode="cover"
                                    style={[styles.markerStyle, scaleStyle]}
                                >
                                </Animated.Image>
                            </Animated.View>
                        </MapView.Marker>
                    )
                }
                )}
            </MapView>
            <Animated.ScrollView
                horizontal={true}
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.nearestPlacesInfoWrapStyle}
                snapToInterval={cardWidth + 20}
                snapToAlignment="center"
                contentContainerStyle={{
                    paddingLeft: Sizes.fixPadding * 5.0,
                    paddingRight: Sizes.fixPadding * 2.0
                }}
                onScroll={
                    Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: mapAnimation,
                                    }
                                }
                            }
                        ],
                        { useNativeDriver: true }
                    )
                }
            >
                {markerList.map((marker, index) => (
                    <View key={index}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => props.navigation.push('ServiceProvider', { marker })}
                            style={styles.nearestPlacesWrapStyle}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Sizes.fixPadding + 7.0 }}>
                                <Image
                                    source={marker.image}
                                    style={{
                                        width: 51.0,
                                        height: 51.0,
                                        borderRadius: 25.5,
                                    }}
                                />
                                <View style={{ marginLeft: Sizes.fixPadding }}>
                                    <Text numberOfLines={1} style={{ ...Fonts.blackColor14Bold }}>
                                        {marker.place}
                                    </Text>
                                    <Text numberOfLines={1} style={{
                                        ...Fonts.grayColor12Regular,
                                        marginVertical: Sizes.fixPadding - 8.0
                                    }}>
                                        {marker.address}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={{ ...Fonts.blackColor12Regular }}>
                                            {marker.rating}
                                        </Text>
                                        <MaterialIcons name="star" size={11} color={Colors.ratingColor}
                                            style={{ marginLeft: Sizes.fixPadding - 5.0, }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ ...Fonts.grayColor12Regular, }}>
                                        Distance
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor14Bold }}>
                                        {marker.distance} km
                                    </Text>
                                </View>
                                <View>
                                   
                                </View>
                                <View style={styles.bookNowButtonStyle}>
                                    <Text style={{ ...Fonts.blackColor12Regular }}>
                                        Book now
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                ))
                }
            </Animated.ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: 'white',
        height: 50.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    markerStyle: {
        width: 30.0, height: 30.0
    },
    nearestPlacesWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 1.0,
        marginHorizontal: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        width: width / 1.5,
        marginBottom: Sizes.fixPadding,
    },
    bookNowButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        paddingVertical: Sizes.fixPadding - 8.0,
        paddingHorizontal: Sizes.fixPadding - 2.0,
        borderRadius: Sizes.fixPadding + 10.0,
    },
    nearestPlacesInfoWrapStyle: {
        position: 'absolute',
        bottom: 130.0,
        left: 0.0,
        right: 0.0,
        paddingVertical: 10.0,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 0,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    drawerStyle: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
    },
    dialogStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    logOutButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    drawerItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
    },
    logoutWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding + 12,
        marginTop: Sizes.fixPadding,
    },
})

HomeScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(HomeScreen);