import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Trajet from "./screens/Trajet";
import { ApolloProvider } from "@apollo/client";
import apolloClient from './gql/apolloClient';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <View>
        <Trajet />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>

  );
}
