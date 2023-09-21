import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { CarPool, useGetCarPoolByDepartureCityLazyQuery, useGetCarPoolByDepartureCityQuery, useGetProfileQuery } from "../gql/generated/schema";
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function CarpoolList() {

    const route = useRoute();
    const [carPoolToDisplay, setCarPoolToDisplay] = useState([]);
    const { data: currentUser, client } = useGetProfileQuery({
        errorPolicy: "ignore",
    });

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [city, setCity] = useState(null);
    const [carPoolByLocationCity, setCarPoolByLocationCity] = useState([]);

    const [GetCarPoolByDepartureCity] = useGetCarPoolByDepartureCityLazyQuery();

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

    // useEffect(() => {
    //     async () => {
    //         const carPoolByLocationCity = await GetCarPoolByDepartureCity({
    //             variables: {
    //                 data: city
    //             },
    //         });
    //         console.log("test" + carPoolByLocationCity);

    //         setCarPoolByLocationCity(carPoolByLocationCity)
    //     }
    // }, [city]);
    // console.log(carPoolByLocationCity);


    // récupère le resultat de la recherche passé dans les params de la route à chaque changement dans la route (dc à chaque recherche)
    useEffect(() => {
        console.log('Résultat de la recherche : ', route.params?.carPoolToDisplay);
        setCarPoolToDisplay(route.params?.carPoolToDisplay)
    }, [route]);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Résultat de votre recherche : </Text>


                {carPoolByLocationCity?.length > 0 ? carPoolByLocationCity.map((carPool: CarPool) => {
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
                    <View><Text>Aucun coivoiturage en partance de {city}</Text></View>
                }


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