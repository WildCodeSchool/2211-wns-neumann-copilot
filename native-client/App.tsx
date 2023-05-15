import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Trajet from "./screens/Trajet";
import { ApolloProvider } from "@apollo/client";
import apolloClient from './gql/apolloClient';
import { NavigationContainer } from '@react-navigation/native'; import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrajetsListe from './screens/TrajetsListe';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Trajet") {
                return (
                  <Ionicons
                    name={focused ? "person-circle" : "person-circle-outline"}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "TrajetsListe") {
                return (
                  <Ionicons
                    name={focused ? "people-circle" : "people-circle-outline"}
                    size={size}
                    color={color}
                  />
                );
              }
              return (
                <Ionicons
                  name={"alert-circle"}
                  size={size}
                  color={color}
                />
              );
            },
            tabBarActiveTintColor: "green",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { height: 60, paddingBottom: 10 }
          })}
        >
          <Tab.Screen name="Trajet" component={Trajet} />
          <Tab.Screen name="TrajetsListe" component={TrajetsListe} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>

  );
}
