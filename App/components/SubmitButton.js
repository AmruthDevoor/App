import { View, Text, Pressable, Dimensions, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.submit}>
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  submit: {
    height: 50,
    width: width - 40,
    backgroundColor: "#0073A9",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    color: "white",
  },
});

export default SubmitButton;
