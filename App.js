import { useState, useEffect } from "react";
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

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
      });
  }

  useEffect(() => {
    loadBusStopData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time:</Text>
      <Text style={styles.arrivalTime}>
        {/* if loading is true, show loading. if loading is false show loaded. */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          "Loaded"
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
    margin: 24,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },

  arrivalTime: {
    margin: 24,
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: 40,
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
    // width: "100%",
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
