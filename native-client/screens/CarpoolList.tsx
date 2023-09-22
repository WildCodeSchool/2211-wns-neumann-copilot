import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { CarPool, useGetCarPoolByDepartureCityLazyQuery, useGetProfileQuery } from "../gql/generated/schema";
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function CarpoolList() {

    const route = useRoute();
    const [carPoolToDisplay, setCarPoolToDisplay] = useState([]);
    const [GetCarPoolByDepartureCity] = useGetCarPoolByDepartureCityLazyQuery();
    const { data: currentUser, client } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [city, setCity] = useState(null);
    const [carPoolByLocationCity, setCarPoolByLocationCity] = useState([]);

    useEffect(() => {
        (async () => {

            // demande les authorisation à l'utilisateur pour récupéré les coordonnées GPS de son device
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // récupère toute les coordonnées de géolocalisation
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // utilise les coordonnées pour trouver le nom de la ville
            let city = await Location.reverseGeocodeAsync(location.coords);
            setCity(city[0].city);

            const carPoolByLocationCity = await GetCarPoolByDepartureCity({
                variables: {
                    data: city[0].city
                },
            });
            setCarPoolByLocationCity(carPoolByLocationCity.data.getCarPoolByDepartureCity)
        })();
    }, []);
    console.log("ville géolocalisé : " + city);

    // récupère le resultat de la recherche passé dans les params de la route à chaque changement dans la route (dc à chaque recherche)
    useEffect(() => {
        console.log('Résultat de la recherche : ', route.params?.carPoolToDisplay);
        setCarPoolToDisplay(route.params?.carPoolToDisplay);
    }, [route]);

    function conditionalDisplay() {
        if (typeof route.params?.carPoolToDisplay !== 'undefined') {
            if (carPoolToDisplay?.length > 0) {
                return (carPoolToDisplay.map((carPool: CarPool) => {
                    return (
                        <View key={carPool.id} style={styles.carpoolContainer}>
                            <View>
                                <Text style={styles.carpoolInfos}>
                                    <Text style={styles.carpoolInfosName}>Ville de départ</Text> : {carPool.departureCity}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.carpoolInfos}>
                                    <Text style={styles.carpoolInfosName}>Ville d'arrivée</Text> : {carPool.arrivalCity}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.carpoolInfos}>
                                    <Text style={styles.carpoolInfosName}>Date et heure</Text> : {carPool.departureDateTime}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.carpoolInfos}>
                                    <Text style={styles.carpoolInfosName}>Nombre de passagers</Text> : {carPool.passengerNumber} personnes
                                </Text>
                            </View>
                        </View>
                    );
                }));
            } else {
                return <Text style={styles.messageNotFound}>Aucun covoiturage correspondant à votre recherche n'a été trouvé.</Text>
            }
        } else if (city) {
            if (carPoolByLocationCity?.length > 0) {
                return (carPoolByLocationCity.map((carPool: CarPool) => {
                    return (
                        <View key={carPool.id} style={styles.carpoolContainer}>
                            <View>
                                <Text style={styles.carpoolInfos}>
                                    <Text style={styles.carpoolInfosName}>Ville de départ</Text> : {carPool.departureCity}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.carpoolInfos}>
                                    <Text style={styles.carpoolInfosName}>Ville d'arrivée</Text> : {carPool.arrivalCity}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.carpoolInfos}>
                                    <Text style={styles.carpoolInfosName}>Date et heure</Text> : {carPool.departureDateTime}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.carpoolInfos}>
                                    <Text style={styles.carpoolInfosName}>Nombre de passagers</Text> : {carPool.passengerNumber} personnes
                                </Text>
                            </View>
                        </View>
                    );
                }));
            } else {
                return <Text style={styles.messageNotFound}>Aucun covoiturage n'a été trouvé dans votre ville.</Text>
            }
        } else {
            return <Text style={styles.messageNotFound}>Nous n'avons pas réussi à trouver la ville où vous vous trouvez.</Text>
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Résultat de votre recherche : </Text>
            {/* 
                pour rendre la bar lateral invisible, ajouter sur la scrollview : showsVerticalScrollIndicator={false}
                pour supprimer les effets d'arrivé en début/fin de scroll : overScrollMode="never"
            */}
            <ScrollView style={styles.scrollView} overScrollMode="never">
                {conditionalDisplay()}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 5,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 10,
        paddingHorizontal: 20,
        color: "#518071",
    },
    scrollView: {
        marginBottom: 80,
    },
    carpoolContainer: {
        backgroundColor: "#ffffff",
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 6.68,
        elevation: 11,
    },
    carpoolInfos: {
        fontSize: 16,
    },
    carpoolInfosName: {
        textDecorationLine: "underline",
    },
    messageNotFound: {
        margin: 20,
        textAlign: "center",
        fontSize: 16,
        color: "#686868",
        textShadowColor: "#aaa",
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 10,
    },
    logout: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    }
});