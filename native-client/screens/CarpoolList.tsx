import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { CarPool, useGetProfileQuery } from "../gql/generated/schema";
import { useRoute } from '@react-navigation/native';

export default function CarpoolList() {

    const route = useRoute();
    const [carPoolToDisplay, setCarPoolToDisplay] = useState([]);
    const { data: currentUser, client } = useGetProfileQuery({
        errorPolicy: "ignore",
    });

    // récupère le resultat de la recherche passé dans les params de la route à chaque changement dans la route (dc à chaque recherche)
    useEffect(() => {
        console.log('Résultat de la recherche : ', route.params?.carPoolToDisplay);
        setCarPoolToDisplay(route.params?.carPoolToDisplay)
    }, [route]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Résultat de votre recherche : </Text>
                {carPoolToDisplay?.length > 0 ? carPoolToDisplay.map((carPool: CarPool) => {
                    return (
                        <View key={carPool.id}>
                            <View>
                                <Text>Départ : {carPool.departureCity}</Text>
                            </View>
                            <View>
                                <Text> Arivée : {carPool.arrivalCity}</Text>
                            </View>
                            <View>
                                <Text> Date & Heure : {carPool.departureDateTime}</Text>
                            </View>
                        </View>
                    )
                }) :
                    <View><Text>Aucun résultat pour votre recherche</Text></View>
                }
            </View>
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