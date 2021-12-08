import React, { Component } from "react";
import { changeTheme, addInfo } from "../../actions";
import {
  View,
  Text,
  BackHandler,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Icon from "./icons";
import * as Font from "expo-font";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
const mainColor = "#045DE9";
const { width } = Dimensions.get("window");
var screenHeight = Math.round(Dimensions.get("window").height) / 100;
var screenWidth = Math.round(Dimensions.get("window").width) / 100;

class Home extends React.Component {
  state = {
    size: { width, height: 150 },
    fontsLoaded: false,
  };
  loadFonts() {
    return Font.loadAsync({
      "Poppins-Light": require("../../../assets/fonts/Poppins-Light.ttf"),
      "Poppins-Medium": require("../../../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Bold": require("../../../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-Regular": require("../../../assets/fonts/Poppins-Regular.ttf"),
    });
  }

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    await this.loadFonts();
    await this.setState({ fontsLoaded: true });
    const token = await AsyncStorage.getItem("token");
    fetch("http://192.168.1.3:3000/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((result) => result.json())
      .then(async (data) => {
        this.props.saveInfo(data);
      });
  };
  handleBackButton = () => {
    this.props.navigation.navigate("Signup");
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#F1EEFc", flexDirection: "row" }}
        >
          <ScrollView>
            <LinearGradient
              colors={["#09C6F9", "#045DE9"]}
              style={styles.linerSty}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}
                style={{
                  flex: 1,
                  marginTop: screenHeight * 5,
                  marginLeft: screenWidth * 2,
                  //   marginRight: "6%",
                }}
              >
                {/*Donute Button Image */}
              </TouchableOpacity>

              <View style={styles.headerContainer}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.userImg}>
                    <Image
                      style={styles.imgSty}
                      source={{ uri: this.props.user.profilePhoto }}
                    />
                  </View>

                  <View
                    style={{
                      padding: 10,
                      marginLeft: "4%",
                      marginTop: screenHeight * 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#FFF",
                        fontFamily: "Poppins-Light",
                      }}
                    >
                      {this.props.user.name}
                    </Text>
                    <Text
                      style={{ color: "#FFF", fontFamily: "Poppins-Light" }}
                    >
                      {this.props.user.email}
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
            <View style={[styles.transferbox, { marginTop: -75 }]}>
              <View style={styles.balance}>
                <Text style={styles.curSty}>Current Balance</Text>
                <Text style={styles.balSty}>$ 1200</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <View style={{ flex: 0.25, margin: 10, marginLeft: 20 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Linear1")}
                  >
                    <LinearGradient
                      colors={["#09C6F9", "#045DE9"]}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.gradsty}
                    >
                      <View style={{ padding: 5, alignItems: "center" }}>
                        <View style={styles.transfer}>
                          <Icon
                            family="MaterialCommunityIcons"
                            name="teach"
                            size={20}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text style={styles.paytypesty}>Teach</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.25, margin: 10, marginLeft: 20 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Chat")}
                  >
                    <LinearGradient
                      colors={["#09C6F9", "#045DE9"]}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.gradsty}
                    >
                      <View style={{ padding: 5, alignItems: "center" }}>
                        <View style={styles.transfer}>
                          <Icon
                            family="FontAwesome5"
                            name="chalkboard-teacher"
                            size={23}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text style={styles.paytypesty}>Learn</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 0.25, margin: 10 }}>
                  <TouchableOpacity
                    onPress={async () => {
                      await AsyncStorage.removeItem("token");
                      this.props.navigation.navigate("Splash Screen");
                    }}
                  >
                    <LinearGradient
                      colors={["#09C6F9", "#045DE9"]}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.gradsty}
                    >
                      <View style={{ padding: 5, alignItems: "center" }}>
                        <View style={styles.transfer}>
                          <Icon family="AntDesign" name="wallet" size={22} />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text style={styles.paytypesty}>Transaction</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 0.25, margin: 10 }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Map")}
                  >
                    <LinearGradient
                      colors={["#09C6F9", "#045DE9"]}
                      // colors={["#fc0f84", "#020cab"]}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.gradsty}
                    >
                      <View style={{ padding: 5, alignItems: "center" }}>
                        <View style={styles.transfer}>
                          <Icon family="Feather" name="map" size={20} />
                        </View>
                      </View>
                    </LinearGradient>
                    <Text style={styles.paytypesty}>Around Me</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginVertical: 15,
                flexWrap: "wrap",
                // justifyContent: "space-evenly",
                // alignSelf: "center",
              }}
            >
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialIcons"
                      name="code"
                      size={20}
                      color="#045DE9"
                    />
                  </View>
                  <Text style={styles.shoptxt}>Coding</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="cash-multiple"
                      size={20}
                      color="#045DE9"
                    />
                  </View>
                  <Text style={styles.shoptxt}>Digital Marketing</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialIcons"
                      name="music-note"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Musical Instrument</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialIcons"
                      name="mic"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Singing</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="FontAwesome"
                      name="edit"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Designing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="image"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Photography</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="FontAwesome"
                      name="list-alt"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Academics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="translate"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Language</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="draw"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Painting</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="chef-hat"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Cooking</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="FontAwesome"
                      name="edit"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Designing</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="image"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Photography</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.shoppingCotainer}>
                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="currency-inr"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Buisness</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shoppingbody}>
                  <View style={styles.shoppingtxt1}>
                    <Icon
                      family="MaterialCommunityIcons"
                      name="dots-horizontal"
                      size={20}
                      color={mainColor}
                    />
                  </View>
                  <Text style={styles.shoptxt}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return <View></View>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.themeReducer,
    user: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: (value) => dispatch(changeTheme(value)),
    saveInfo: (value) => dispatch(addInfo(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
