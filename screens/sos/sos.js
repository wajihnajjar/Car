import React, { Component } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, StyleSheet, Text, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

const carsList = [
    {
        id: '1',
        image: require('../../assets/images/test.jpg'),
        name: '2015 Ford F-450 4x4/Jerr Dan',
        place : 'tunis',
        number: '28524114',

    },
    {
        id: '2',
        image: require('../../assets/images/i.jpg'),
        name: 'MDOT SHA',
        place: 'sousse',
        number: '90200100',
    }
];

const { width } = Dimensions.get('screen');

class Sos extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop()
        return true;
    };

    state = {
        isDeleteCarDialog: false,
        deleteCarId: '',
        cars: carsList,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    {this.cars()}
                    {this.deleteCarDialog()}
                </View>
            </SafeAreaView>
        )
    }

    deleteCarDialog() {
        return (
            <Dialog.Container
                visible={this.state.isDeleteCarDialog}
                contentStyle={styles.dialogContainerStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <Text style={{ marginTop: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        Are you sure delete this car?
                    </Text>
                    <View style={styles.cancelAndDeleteButtonWrapStyle}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({
                                isDeleteCarDialog: false,
                                deleteCarId: '',
                            })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor14Medium }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                this.setState({ isDeleteCarDialog: false })
                                this.handleDelete();
                            }}
                            style={styles.deleteButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor14Medium }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    handleDelete() {
        const newList = this.state.cars.filter((val, i) => {
            if (val.id !== this.state.deleteCarId) {
                return val;
            }
        })
        this.setState({ cars: newList })
    }


    cars() {
        const renderItem = ({ item }) => (
            <View style={styles.carsInfoWrapStyle}>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Image
                        source={item.image}
                        style={{ width: 80.0, height: 80.0, borderRadius: Sizes.fixPadding }}
                    />
                    <View style={{ marginLeft: Sizes.fixPadding, }}>
                    <Text style={{ ...Fonts.blackColor18Bold, width: width / 1.9, }}>
                            Place : {item.place}
                        </Text>
                        <Text style={{ ...Fonts.blackColor18Bold, width: width / 1.9, }}>
                            Car : {item.name}
                        </Text>
                    
                        <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding }}>
                           Number : {item.number}
                        </Text>
                    </View>
                </View>
                <MaterialIcons name="rate-review" size={24} color={Colors.primaryColor}
                    onPress={() =>  this.props.navigation.push("Feedback")}
                />
            </View>
        )
        return (
            <View>
                <FlatList
                    data={this.state.cars}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: Sizes.fixPadding + 5.0 }}
                />
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.blackColor}
                    onPress={() => this.props.navigation.goBack()}
                    style={{ position: 'absolute', left: 20.0 }}
                />
                <Text style={{ ...Fonts.blackColor18Bold, marginLeft: Sizes.fixPadding + 5.0, }}>
                    Our Sos Provided 🆘
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 56.0,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    addNewCarButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        borderStyle: 'dashed',
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        height: 40.0
    },
    carsInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    deleteButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
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
    cancelAndDeleteButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding,
    }
})

Sos.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(Sos);