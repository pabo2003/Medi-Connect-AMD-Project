import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  const features: { id: string; title: string; icon: keyof typeof MaterialIcons.glyphMap; description: string }[] = [
    { id: '1', title: 'Medicine Management', icon: 'medical-services', description: 'Browse and order medicines with detailed information' },
    { id: '2', title: 'Health Packages', icon: 'inventory', description: 'Specialized health packages tailored to your needs' },
    { id: '3', title: 'Wellness Guidance', icon: 'favorite', description: 'Daily health tips and medication reminders' },
    { id: '4', title: '24/7 Support', icon: 'support-agent', description: 'Round the clock customer support and consultation' },
  ];

  const contactMethods: { id: string; type: string; value: string; icon: 'phone' | 'email' | 'location-on'; action: string }[] = [
    { id: '1', type: 'Phone', value: '+1 (555) 123-4567', icon: 'phone', action: 'tel:+15551234567' },
    { id: '2', type: 'Email', value: 'support@medicare.com', icon: 'email', action: 'mailto:support@medicare.com' },
    { id: '3', type: 'Address', value: '123 Health Street, Medical City', icon: 'location-on', action: 'https://maps.google.com' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#8A2BE2', '#FF00FF']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.appName}>Medi Connect</Text>
            <Text style={styles.tagline}>Your Health, Our Priority</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* About Us Section */}
        <LinearGradient colors={['#4B0082', '#8B008B']} style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About Medi Connect</Text>
          <Text style={styles.aboutText}>
            Medi Connect is a revolutionary pharmacy mobile application designed to simplify 
            pharmacy services while encouraging healthier lifestyles. We bridge the gap between 
            traditional pharmacy services and modern digital convenience.
          </Text>
          <Text style={styles.aboutText}>
            Our mission is to create a simple, user-friendly platform that connects pharmacies 
            with their customers while fostering long-term wellness in the community.
          </Text>
        </LinearGradient>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: '#FFFFFF'}]}>Our Features</Text>
          <View style={styles.featuresGrid}>
            {features.map(item => (
              <LinearGradient 
                key={item.id} 
                colors={['#800080', '#FF00FF']}
                style={styles.featureCard}
              >
                <View style={styles.featureIconContainer}>
                  <MaterialIcons name={item.icon} size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </LinearGradient>
            ))}
          </View>
        </View>

        {/* Contact Us Section */}
        <LinearGradient colors={['#4B0082', '#8A2BE2']} style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.contactIntro}>
            Have questions or need assistance? We're here to help you!
          </Text>
          
          <View style={styles.contactMethods}>
            {contactMethods.map(item => (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => Linking.openURL(item.action)}
              >
                <LinearGradient 
                  colors={['#000000', '#4B0082']}
                  style={styles.contactCard}
                >
                  <MaterialIcons name={item.icon} size={24} color="#FFFFFF" />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactType}>{item.type}</Text>
                    <Text style={styles.contactValue}>{item.value}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

        {/* Footer */}
        <LinearGradient colors={['#000000', '#4B0082']} style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Medi Connect. All rights reserved.</Text>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeSection: {
    flex: 1,
    alignItems: 'center',
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '300',
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    marginTop: 5,
    letterSpacing: -0.5,
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#000',
  },
  aboutSection: {
    padding: 25,
    margin: 16,
    borderRadius: 16,
  },
  section: {
    backgroundColor: '#000',
    padding: 20,
    margin: 16,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  aboutText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  featureIconContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
  },
  contactSection: {
    padding: 25,
    margin: 16,
    borderRadius: 16,
  },
  contactIntro: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  contactMethods: {
    marginTop: 10,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactInfo: {
    marginLeft: 16,
  },
  contactType: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Home;