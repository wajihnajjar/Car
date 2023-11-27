import React, { Component, useState } from "react";
import { SafeAreaView, View, BackHandler, StatusBar, StyleSheet, TouchableOpacity, Animated, Text, Image, TouchableHighlight } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Snackbar } from 'react-native-paper';

const favoritesList = [
    {
        key: '1',
        image: require('../../assets/images/service_provider/provider_1.jpg'),
        name: 'Perfect Car Wash Services',
        address: '104, Apple Square, New york',
    },
    {
        key: '2',
        image: require('../../assets/images/service_provider/provider_3.jpg'),
        name: 'Quicky Car Services',
        address: 'G-9, Opera Canter, New York.',
    },
];

class FavoritesScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.goBack()
        return true;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <Favorites />
                </View>
            </SafeAreaView>
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
                    Favorites
                </Text>
            </View>
        )
    }
}

const rowSwipeAnimatedValues = {};

Array(favoritesList.length + 1)
    .fill('')
    .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });

const Favorites = () => {
    const [showSnackBar, setShowSnackBar] = useState(false);

    const [listData, setListData] = useState(favoritesList);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setShowSnackBar(true);
        setListData(newData);
    };

    const onSwipeValueChange = swipeData => {
        const { key, value } = swipeData;
        rowSwipeAnimatedValues[key].setValue(Math.abs(value));
    };

    const renderItem = data => (
        <TouchableHighlight
            activeOpacity={0.9}
            style={{ backgroundColor: Colors.whiteColor }}
            activeOpacity={0.9}
        >
            <View
                style={styles.favoriteCarWrapStyle}>
                <Image
                    source={data.item.image}
                    resizeMode="cover"
                    style={styles.favoriteCarImageStyle}
                />
                <View style={{ paddingHorizontal: Sizes.fixPadding, paddingVertical: Sizes.fixPadding - 3.0 }}>
                    <Text style={{ ...Fonts.blackColor18Bold }}>
                        {data.item.name}
                    </Text>
                    <Text numberOfLines={1} style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.grayColor16Medium }}>
                        {data.item.address}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.backDeleteContinerStyle}
                onPress={() => deleteRow(rowMap, data.item.key)}
            >
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: rowSwipeAnimatedValues[
                                        data.item.key
                                    ].interpolate({
                                        inputRange: [45, 90],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <MaterialIcons
                        name="delete"
                        size={24}
                        color={Colors.whiteColor}
                        style={{ alignSelf: 'center' }}
                    />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {
                listData.length == 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="favorite-border" size={50} color={Colors.grayColor} />
                        <Text style={{ ...Fonts.grayColor20Bold, marginTop: Sizes.fixPadding + 5.0 }}>
                            No item in favorite
                        </Text>
                    </View>
                    :
                    <View style={{ flex: 1 }}>
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-100}
                            onSwipeValueChange={onSwipeValueChange}
                            contentContainerStyle={{
                                paddingVertical: Sizes.fixPadding + 5.0,
                            }}
                        />
                    </View>
            }
            <Snackbar
                style={styles.snackBarStyle}
                visible={showSnackBar}
                onDismiss={() => setShowSnackBar(false)}
            >
                <Text style={{ ...Fonts.whiteColor14Medium }}>
                    Removed from favorites
                </Text>
            </Snackbar>
        </View>
    );
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
    favoriteCarWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding + 5.0
    },
    favoriteCarImageStyle: {
        height: 227.0,
        width: '100%',
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: -10.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 15,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 90,
        backgroundColor: 'red',
        right: 0,
    },
})

FavoritesScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(FavoritesScreen);