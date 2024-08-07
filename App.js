import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import temperatureIcon from "./img/bed.jpg";

export default function App() {
  const [sensorData, setSensorData] = useState(""); // Sử dụng state để lưu trữ dữ liệu cảm biến
  const fetchData = async () => {
    // Gửi yêu cầu lấy dữ liệu từ backend
    try {
      const response = await fetch("http://192.168.43.96:3000/SimpleGateway"); // Thay đổi URL theo địa chỉ backend của bạn
      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleLight = async (status) => {
    // Gửi yêu cầu điều khiển đèn tới backend
    try {
      const response = await fetch(
        `http://192.168.43.96:3000/SimpleGateway/${status}`
      ); // Thay đổi URL theo địa chỉ backend của bạn
      // Có thể xử lý phản hồi từ backend ở đây nếu cần
    } catch (error) {
      console.error("Error toggling light:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.temperatureContainer}>
        <Image source={temperatureIcon} style={styles.icon} />
      </View>
      <View style={styles.container}>
        <Text style={styles.temperatureText}>Cảm Biến Độ Ẩm: {sensorData}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={() => toggleLight("on")}
        >
          <Text style={styles.buttonText}>Mở Đèn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => toggleLight("off")}
        >
          <Text style={styles.buttonText}>Tắt Đèn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "yellow" }]}
          onPress={() => toggleLight("auto")}
        >
          <Text style={styles.buttonText}>Tự động</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  temperatureContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 300,
    height: 300,
    marginRight: 1,
  },
  temperatureText: {
    fontSize: 18,
    color: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
