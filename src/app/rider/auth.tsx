import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { authStyles } from "@/styles/authStyles";
import { commonStyles } from "@/styles/commonStyles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomText from "@/components/shared/CustomText";
import { useWS } from "@/service/WSProvider";
import PhoneInput from "@/components/shared/PhoneInput";
import CustomButton from "@/components/shared/CustomButton";
import { signin } from "@/service/authService";
import LottieView from 'lottie-react-native'; // Lottie import

const Auth = () => {
  const { updateAccessToken } = useWS();
  const [phone, setPhone] = useState("");

  const handleNext = async () => {
    if (!phone || phone.length !== 10) {
      Alert.alert("Please enter your phone number");
      return;
    }
    signin({ role: "rider", phone }, updateAccessToken);
  };

  return (
    <SafeAreaView style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.container}>
        <View style={commonStyles.flexRowBetween}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={[authStyles.logo, {width: 165, height: 120, resizeMode: 'contain'}]}
          />
          <TouchableOpacity style={authStyles.flexRowGap}>
            <MaterialIcons name="help" size={18} color="grey" />
            <CustomText fontFamily="Medium" variant="h7">
              Help
            </CustomText>
          </TouchableOpacity>
        </View>

        <CustomText fontFamily="Medium" variant="h6">
          Good to see you, Rider!
        </CustomText>

        <CustomText
          variant="h7"
          fontFamily="Regular"
          style={commonStyles.lightText}
        >
          Enter your phone number to proceed
        </CustomText>

        <PhoneInput onChangeText={setPhone} value={phone} />
        
        {/* Lottie Animation - Phone */}
        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
          <LottieView
            source={require('@/assets/images/Green Login (7).json')}
            autoPlay
            loop
            style={{ width: 260, height: 280 }}
          />
        </View>
      </ScrollView>

      <View style={authStyles.footerContainer}>
        <CustomText
          variant="h8"
          fontFamily="Regular"
          style={[
            commonStyles.lightText,
            { textAlign: "center", marginHorizontal: 20 },
          ]}
        >
          By continuing, you agree to the terms and privacy policy of Ride App
        </CustomText>

        <CustomButton
          title="Next"
          onPress={handleNext}
          loading={false}
          disabled={false}
          style={{backgroundColor: '#007AFF'}} // Blue color
        />
      </View>
    </SafeAreaView>
  );
};

export default Auth;