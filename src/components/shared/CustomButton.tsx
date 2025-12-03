import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { FC } from "react";
import CustomText from "./CustomText";
import { RFValue } from "react-native-responsive-fontsize";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  title,
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? "#87CEEB" : "blue", // Blue button
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <CustomText
          fontFamily="SemiBold"
          style={{
            fontSize: RFValue(12),
            color: "#fff", // White text for contrast
          }}
        >
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default CustomButton;
