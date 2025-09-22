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
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/types/user";
import { registerUser } from "@/services/authService";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

// Medical cross logo component
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

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState<boolean>(true);

const handleRegister = async () => {
  if (!email || !password || !confirmPassword) {
    console.log("⚠️ Please fill in all fields");
    return;
  }

  if (password !== confirmPassword) {
    console.log("⚠️ Passwords do not match");
    return;
  }

  if (password.length < 6) {
    console.log("⚠️ Password should be at least 6 characters");
    return;
  }

  if (isLoading) return;

  setIsLoading(true);
  console.log("🚀 Registering user with email:", email);

  try {
    const response = await registerUser({ email, password } as User);

    if (response) {
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        console.log("✅ Registration simulated successfully!");
        alert("Registration Successful")
        router.push("/login");
        setIsLoading(false);
      }, 1500);
    } else {
      console.log("❌ Registration failed");
      alert("Registration Failed")
      setIsLoading(false);
    }
  } catch (error) {
    console.log("❌ Error during registration:", error);
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

            {/* Registration Form */}
            <LinearGradient colors={['#8A2BE2', '#FF00FF']} style={styles.formContainer}>
              <Text style={styles.welcomeText}>Create Account</Text>
              <Text style={styles.instructionText}>
                Sign up to get started with Medi-Care
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

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.inputIcon} />
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#CCCCCC"
                  style={styles.input}
                  secureTextEntry={confirmSecureTextEntry}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <Pressable 
                  onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={confirmSecureTextEntry ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#fff" 
                  />
                </Pressable>
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="large" />
                ) : (
                  <LinearGradient colors={['#8A2BE2', '#FF00FF']} style={styles.registerButtonGradient}>
                    <View style={styles.buttonContent}>
                      <Text style={styles.registerButtonText}>Register</Text>
                      <Ionicons name="person-add" size={20} color="#fff" />
                    </View>
                  </LinearGradient>
                )}
              </TouchableOpacity>

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By registering, you agree to our{" "}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <Pressable 
                style={styles.loginContainer}
                onPress={() => router.push("/login")}
              >
                <Text style={styles.loginText}>
                  Already have an account?{" "}
                  <Text style={styles.loginLink}>Login Now</Text>
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
  registerButton: {
    height: 55,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 15,
  },
  registerButtonGradient: {
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
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  termsContainer: {
    marginBottom: 20,
  },
  termsText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  termsLink: {
    color: "#fff",
    fontWeight: "600",
    textDecorationLine: "underline",
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
  loginContainer: {
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: 15,
  },
  loginLink: {
    color: "#fff",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

export default Register;