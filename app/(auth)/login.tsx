import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

// New medical cross logo component
const MedicalCrossIcon = ({ size = 60, color = "#fff" }) => {
  return (
    <View style={[styles.logo, { width: size, height: size }]}>
      <View style={[styles.crossLine, { 
        backgroundColor: color, 
        width: size * 0.6, 
        height: size * 0.15,
        top: size * 0.425
      }]} />
      <View style={[styles.crossLine, { 
        backgroundColor: color, 
        width: size * 0.15, 
        height: size * 0.6,
        left: size * 0.425
      }]} />
    </View>
  );
};

const Login = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  

  const handleLogin = async () => {
   try{
     if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (isLoading) return;
    
    setIsLoading(true);
    const response = await login(email, password)
     if(response){
      setIsLoading(false);
      //set email AsyncStorage
      await AsyncStorage.setItem("userEmail", email);
      router.replace("/(dashboard)/home");
      Alert.alert("Success", "Login successful");
      setEmail("");
      setPassword("");
      
     }
      else{
       Alert.alert("Error", "Login failed");
       setIsLoading(false);
      }
   }catch{
      Alert.alert("Error", "Login failed. Please check your credentials and try again.");
      setIsLoading(false);
   }
  };

  return (
    <LinearGradient colors={['#000000', '#4B0082']} style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            {/* Logo/Header Section */}
            <LinearGradient colors={['#8A2BE2', '#FF00FF']} style={styles.logoContainer}>
              <MedicalCrossIcon size={80} color="#fff" />
              <Text style={styles.appName}>Medi-Care</Text>
              <Text style={styles.tagline}>Your Health, Our Priority</Text>
            </LinearGradient>

            {/* Login Form */}
            <LinearGradient colors={['#8A2BE2', '#FF00FF']} style={styles.formContainer}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.instructionText}>
                Sign in to access your account
              </Text>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#fff" style={styles.inputIcon} />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#CCCCCC"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.inputIcon} />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#CCCCCC"
                  style={styles.input}
                  secureTextEntry={secureTextEntry}
                  value={password}
                  onChangeText={setPassword}
                />
                <Pressable 
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={secureTextEntry ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#fff" 
                  />
                </Pressable>
              </View>

              <Pressable 
                onPress={() => Alert.alert("Info", "Forgot password feature would be implemented here")}
                style={styles.forgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="large" />
                ) : (
                  <LinearGradient colors={['#8A2BE2', '#FF00FF']} style={styles.loginButtonGradient}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.loginButtonText}>Login</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </View>
                  </LinearGradient>
                )}
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable 
                style={styles.signupContainer}
                onPress={() => router.push("/register")}
              >
                <Text style={styles.signupText}>
                  Don't have an account?{" "}
                  <Text style={styles.signupLink}>Register Now</Text>
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
    overflow: "hidden",
  },
  logo: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossLine: {
    position: 'absolute',
    borderRadius: 3,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginTop: 15,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    fontWeight: "500",
  },
  formContainer: {
    borderRadius: 20,
    padding: 25,
    overflow: 'hidden',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#8A2BE2",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#fff",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  loginButton: {
    height: 55,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  loginButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  dividerText: {
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  signupContainer: {
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    fontSize: 15,
  },
  signupLink: {
    color: "#fff",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

export default Login;