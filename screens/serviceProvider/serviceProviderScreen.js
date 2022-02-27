import React, { Component } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, StyleSheet, ScrollView, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import CollapsingToolbar from "../../components/sliverAppBarScreen";
import MapView, { Marker } from "react-native-maps";
import { Snackbar } from "react-native-paper";

const reviewsList = [
    {
        id: '1',
        image: require('../../assets/images/user/user_3.jpg'),
        name: 'Emilli Williamson',
        date: '20 Feb, 2021',
        review: 'Best Services.',
        rating: 5,
    },
    {
        id: '2',
        image: require('../../assets/images/user/user_3.jpg'),
        name: 'Emilli Williamson',
        date: '20 Feb, 2021',
        review: 'Best Services.',
        rating: 5,
    },
    {
        id: '3',
        image: require('../../assets/images/user/user_1.jpg'),
        name: 'John Smith',
        date: '19 Feb, 2021',
        review: 'Its really good car service center.',
        rating: 4,
    },
    {
        id: '4',
        image: require('../../assets/images/user/user_8.jpg'),
        name: 'David Johnson',
        date: '15 Feb, 2021',
        review: 'Decent service.',
        rating: 3,
    }
];

const servicesList = [
    {
        id: '1',
        service: 'Body Wash',
        amount: 50,
        icon: 'directions-car',
        isSelected: true,
    },
    {
        id: '2',
        service: 'Interior Cleaning',
        amount: 80,
        icon: 'airline-seat-recline-extra',
        isSelected: false,
    },
    {
        id: '3',
        service: 'Engine Detailing',
        amount: 90,
        icon: 'dashboard',
        isSelected: false,
    },
    {
        id: '4',
        service: 'Light Service',
        amount: 70,
        icon: 'highlight',
        isSelected: false,
    }
];

class ServiceProviderScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    item = this.props.navigation.getParam('marker');

    state = {
        currentInfoIndex: 1,
        servicesData: servicesList,
        showSnackBar: false,
        isFavorite: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <CollapsingToolbar
                    leftItem={
                        <MaterialIcons name="arrow-back" size={24}
                            color={Colors.whiteColor}
                            onPress={() => this.props.navigation.pop()}
                        />
                    }
                    rightItem={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}
                        >
                            <MaterialIcons
                                name={this.state.isFavorite ? "favorite" : "favorite-border"}
                                size={24}
                                color={Colors.whiteColor}
                                style={{
                                    marginRight: Sizes.fixPadding + 5.0
                                }}
                                onPress={() => this.setState({ showSnackBar: true, isFavorite: !this.state.isFavorite })}
                            />
                            <Image
                                source={require('../../assets/images/direction.png')}
                                style={{ width: 20.0, height: 20.0, }}
                            />
                            <MaterialIcons name="phone" size={24} color={Colors.whiteColor}
                                style={{ marginLeft: Sizes.fixPadding + 5.0 }}
                            />
                        </TouchableOpacity>
                    }
                    toolbarColor={Colors.primaryColor}
                    toolBarMinHeight={50}
                    toolbarMaxHeight={300}
                    src={this.item.image}>
                    <View style={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
                        {this.serviceInfo()}
                        {this.servicesAboutAndReviewsInfo()}
                        {this.state.currentInfoIndex == 1
                            ?
                            <>
                                {this.services()}
                            </>
                            :
                            null
                        }
                        {
                            this.state.currentInfoIndex == 2
                                ?
                                <>
                                    {this.openingHoursInfo()}
                                    {this.aboutInfo()}
                                    {this.locationInfo()}
                                </>
                                :
                                null
                        }
                        {
                            this.state.currentInfoIndex == 3
                                ?
                                <>
                                    {this.reviews()}
                                </>
                                :
                                null
                        }
                    </View>

                </CollapsingToolbar>
                {this.state.currentInfoIndex == 1
                    ?
                    <>
                        {this.bookNowButton()}
                    </>
                    :
                    null
                }
                <Snackbar
                    style={{ ...styles.snackBarStyle, bottom: this.state.currentInfoIndex == 1 ? 40.0 : -10.0, }}
                    visible={this.state.showSnackBar}
                    onDismiss={() => this.setState({ showSnackBar: false })}
                >
                    {this.state.isFavorite ? 'Added to favorite' : 'Remove from favorite'}
                </Snackbar>
            </SafeAreaView>
        )
    }

    reviews() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0 }}>
                {reviewsList.map((item) => (
                    <View key={`${item.id}`}>
                        <View style={styles.reviewsWrapStyle}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Image
                                        source={item.image}
                                        style={{ width: 40.0, height: 40.0, borderRadius: 20.0, }}
                                    />
                                    <View style={{ marginLeft: Sizes.fixPadding }}>
                                        <Text style={{ ...Fonts.blackColor14Bold }}>
                                            {item.name}
                                        </Text>
                                        <Text style={{ ...Fonts.grayColor10Medium }}>
                                            {item.date}
                                        </Text>
                                    </View>
                                </View>
                                {this.showRating({ number: item.rating })}
                            </View>
                            <Text style={{ ...Fonts.blackColor12Regular, marginTop: Sizes.fixPadding }}>
                                {item.review}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    showRating({ number }) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0 || number == 1.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0 || number == 2.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0 || number == 4.0 || number == 3.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0 || number == 4.0)
                        ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
                {
                    (number == 5.0) ?
                        <MaterialIcons
                            name="star"
                            size={16}
                            color={Colors.ratingColor}
                        />
                        :
                        null
                }
            </View>
        )
    }

    locationInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor18Bold, marginBottom: Sizes.fixPadding }}>
                    Location
                </Text>
                <View style={styles.mapStyle}>
                    <MapView
                        style={{ height: 191 }}
                        initialRegion={{
                            latitude: 37.33233141,
                            longitude: -122.0312186,
                            latitudeDelta: 0.10,
                            longitudeDelta: 0.10,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: 37.33233141, longitude: -122.0312186 }}
                        >
                            <Image
                                source={require('../../assets/images/custom_marker.png')}
                                style={{ width: 30.0, height: 30.0 }}
                            />
                        </Marker>

                    </MapView>
                </View>
            </View>
        )
    }

    aboutInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding + 2.0, }}>
                <Text style={{ ...Fonts.blackColor18Bold, marginBottom: Sizes.fixPadding }}>
                    About
                </Text>
                <Text style={{ ...Fonts.blackColor12Regular }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
                    pharetra luctus turpis quis senectus vitae dis nisl porttitor. Et
                    id venenatis, potenti sapien purus aliquam est. Tellus ut
                    tincidunt id mi cum. Bibendum vestibulum blandit semper
                    aenean egestas nunc dignissim id.
                </Text>
            </View>
        )
    }

    openingHoursInfo() {
        return (
            <View style={styles.openingHoursInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    Opening Hours
                </Text>
                <Text style={{ ...Fonts.primaryColor12Regular, marginTop: Sizes.fixPadding - 5.0 }}>
                    Open now (09:00 AM - 22:00 PM)
                </Text>
            </View>
        )
    }

    totalAmount() {
        let newList = this.state.servicesData.filter(a => a.isSelected == true);
        const total = newList.reduce((sum, i) => {
            return sum += i.amount
        }, 0);
        return total;
    }

    bookNowButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.push('SelectCar')}
                style={styles.bookNowButtonStyle}>
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Book now (${`${this.totalAmount()}`})
                </Text>
            </TouchableOpacity>
        )
    }

    changeSelection({ id }) {
        const newList = this.state.servicesData.map((service) => {
            if (service.id === id) {
                const updatedItem = { ...service, isSelected: !service.isSelected, };
                return updatedItem;
            }
            return service;
        });
        this.setState({ servicesData: newList, })
    }

    services() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.changeSelection({ id: item.id })}
                style={styles.servicesWrapStyle}>
                <View style={{
                    ...styles.servicesIconWrapStyle,
                    backgroundColor: item.isSelected ? Colors.primaryColor : Colors.whiteColor,
                }}>
                    <MaterialIcons
                        name={item.icon}
                        size={25}
                        color={item.isSelected ? Colors.whiteColor : Colors.primaryColor}
                    />
                </View>
                <Text numberOfLines={1} style={{ paddingHorizontal: Sizes.fixPadding - 5.0, textAlign: 'center', ...Fonts.blackColor18Bold, marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding - 5.0 }}>
                    {item.service}
                </Text>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    ${item.amount}
                </Text>
                {
                    item.isSelected ?
                        <View style={styles.checkIconWrapStyle}>
                            <MaterialIcons name="check" size={12} color={Colors.whiteColor} />
                        </View> :
                        null
                }
            </TouchableOpacity>
        )
        return (
            <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    flex: 1
                }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    data={this.state.servicesData}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingTop: Sizes.fixPadding + 5.0,
                        paddingHorizontal: Sizes.fixPadding + 3.0,
                    }}
                />
            </ScrollView>
        );
    }

    servicesAboutAndReviewsInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding - 5.0, }}>
                <View style={{ height: 1.0, backgroundColor: Colors.grayColor }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    {this.servicesAboutAndReviews({ title: 'Services', index: 1, })}
                    <View style={{ height: 35.0, width: 1.0, backgroundColor: Colors.grayColor }} />
                    {this.servicesAboutAndReviews({ title: 'About', index: 2, })}
                    <View style={{ height: 35.0, width: 1.0, backgroundColor: Colors.grayColor }} />
                    {this.servicesAboutAndReviews({ title: 'Reviews', index: 3, })}
                </View>
                <View style={{ height: 1.0, backgroundColor: Colors.grayColor }} />
            </View>
        )
    }

    servicesAboutAndReviews({ title, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.setState({ currentInfoIndex: index })}
                style={{
                    flex: 1,
                    backgroundColor: this.state.currentInfoIndex == index ? Colors.primaryColor : Colors.whiteColor,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text style={this.state.currentInfoIndex == index ?
                    { ...Fonts.whiteColor14Bold } : { ...Fonts.blackColor14Bold }
                }>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }

    serviceInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding }}>
                <Text style={{ ...Fonts.blackColor18Bold }}>
                    {this.item.place}
                </Text>
                <Text style={{ ...Fonts.grayColor14Medium, marginVertical: Sizes.fixPadding - 5.0 }}>
                    {this.item.address}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.blackColor14Regular }}>
                        {this.item.rating}
                    </Text>
                    <MaterialIcons name="star-rate" size={14} color={Colors.ratingColor}
                        style={{ marginHorizontal: Sizes.fixPadding - 5.0 }}
                    />
                    <Text style={{ ...Fonts.blackColor14Regular }}>
                        (728 Reviews)
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    servicesWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        elevation: 3.0,
        flex: 1,
        paddingVertical: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
        borderColor: '#D7D7D7',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 3.0,
    },
    servicesIconWrapStyle: {
        width: 60.0,
        height: 60.0,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
    },
    bookNowButtonStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50.0,
    },
    checkIconWrapStyle: {
        position: 'absolute',
        top: 5.0,
        right: 10.0,
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        borderRadius: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding - 5.0,
        overflow: 'hidden',
        elevation: 3.0,
        borderColor: '#D7D7D7',
        borderWidth: 1.0,
    },
    openingHoursInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 2.0,
    },
    reviewsWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: '#D7D7D7',
        borderWidth: 1.0,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 5.0
    },
    snackBarStyle: {
        position: 'absolute',
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
    }
})

ServiceProviderScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(ServiceProviderScreen);