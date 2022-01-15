import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";

export default function App() {
  // _loading_ is a variable with initial value true
  // _setLoading_ is function to set the value for the loading variable
  // _useState(true)_ is a function that initialise state of the loading variable
  // to true
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=54009";

  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [duration, setDuration] = useState("");

  function loadBusStopData() {
    setLoading(true);

    // this returns a response object
    fetch(BUSSTOP_URL)
      // this returns a json inside the response object
      .then((response) => {
        return response.json();
      })
      // responseData is the same as response.json()
      .then((responseData) => {
        const myBus = responseData.services.filter(
          (bus) => bus.no === "265"
        )[0];
        console.log("My bus:");
        console.log(myBus.next.time);
        setLoading(false);
        const date = new Date(myBus.next.time);
        const [hour, minutes, seconds] = [
          ("0" + date.getHours()).slice(-2),
          ("0" + date.getMinutes()).slice(-2),
          ("0" + date.getSeconds()).slice(-2),
        ];
        setArrival([hour, ":", minutes, ":", seconds]);
        setDuration(myBus.next.duration_ms);
      });
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadBusStopData();
    }, 10000);
    // Return the function to run when unmounting
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus: 265</Text>
      <Text style={styles.title}>Bus stop: 54009</Text>
      <Text style={styles.title}>arrival time</Text>
      <Text style={styles.arrivalTime}>
        {/* if loading is true, show loading. if loading is false show loaded. */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          // Date(arrival)
          arrival
        )}
      </Text>
      <Text style={styles.title}>duration</Text>
      <Text style={styles.arrivalTime}>
        {/* if loading is true, show loading. if loading is false show loaded. */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          millisToMinutesAndSeconds(duration) + " min"
        )}
      </Text>
      <TouchableOpacity onPress={loadBusStopData} style={styles.button}>
        <Text style={styles.buttonText}>Refresh!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    margin: 10,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },

  arrivalTime: {
    margin: 24,
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: 30,
  },

  button: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    shadowColor: "grey",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    alignItems: "center",
    borderBottomRightRadius: 30,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },

  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
