import Trajet from "./screens/Trajet";
import { ApolloProvider } from "@apollo/client";
import apolloClient from './gql/apolloClient';
import { NavigationContainer } from '@react-navigation/native'; import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './screens/Login';
import Ionicons from '@expo/vector-icons/Ionicons';
import NotificationsSreen from "./screens/NotificationsSreen";

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Trajet") {
                return (
                  <Ionicons
                    name={focused ? "car-sport" : "car-sport-outline"}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "Login") {
                return (
                  <Ionicons
                    name={focused ? "person-circle" : "person-circle-outline"}
                    size={size}
                    color={color}
                  />
                );
              } else if (route.name === "Notifications") {
                return (
                  <Ionicons
                    name={focused ? "notifications-circle" : "notifications-circle-outline"}
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
            tabBarActiveTintColor: "#518071",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: { height: 60, paddingBottom: 10 },
            headerTitleAlign: "center",
            headerTintColor: "#518071"
          })}
        >
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Trajet" component={Trajet} />
          <Tab.Screen name="Notifications" component={NotificationsSreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}