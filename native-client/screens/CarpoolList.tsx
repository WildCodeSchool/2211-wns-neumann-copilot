import { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useGetProfileQuery, useLoginMutation, useLogoutMutation, useUpdateProfileMutation } from "../gql/generated/schema";
import * as SecureStore from 'expo-secure-store';
import { registerForPushNotificationsAsync } from "../utils/notifications";

export default function CarpoolList() {

    const { data: currentUser, client } = useGetProfileQuery({
        errorPolicy: "ignore",
    });

    return (
        <View style={styles.container}>
            {currentUser ?
                <View>
                    <Text style={styles.title}>Résultat de votre recherche : </Text>
                </View>
                :
                <Text style={styles.logout}>Vous devez être connecté !</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginHorizontal: 20,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 30,
        color: "#518071",
    },
    logout: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    }
});