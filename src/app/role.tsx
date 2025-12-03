import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { roleStyles } from "@/styles/roleStyles";
import CustomText from "@/components/shared/CustomText";

const Role = () => {
  const handleCustomerPress = () => {
    router.navigate("/customer/auth");
  };

  const handleRiderPress = () => {
    router.navigate("/rider/auth");
  };

  return (
    <View style={roleStyles.container}>
      {/* --- बदलाव यहाँ किया गया है --- */}
      <Image
        source={require("../assets/images/logo.png")}
        // style को एक ऐरे (array) में डालकर नई height और width दी गई है
        style={[roleStyles.logo, { width: 2000, height: 150}]}
      />
      {/* --- बदलाव समाप्त --- */}
      
      <CustomText fontFamily="Medium" variant="h6">
        Choose your user type
      </CustomText>

      <TouchableOpacity style={roleStyles.card} onPress={handleCustomerPress}>
        <Image
          source={require("@/assets/images/customer.jpg")}
          style={roleStyles.image}
        />
        <View style={roleStyles.cardContent}>
          <CustomText style={roleStyles.title}>Customer</CustomText>
          <CustomText style={roleStyles.description}>
            Are you a customer? Order rides and deliveries easily.
          </CustomText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={roleStyles.card} onPress={handleRiderPress}>
        <Image
          source={require("@/assets/images/rider.jpg")}
          style={roleStyles.image}
        />
        <View style={roleStyles.cardContent}>
          <CustomText style={roleStyles.title}>Rider</CustomText>
          <CustomText style={roleStyles.description}>
            Are you a Rider? Join us to drive and deliver.
          </CustomText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Role;