import { StyleSheet, Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, Switch, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { useCreateCarPoolMutation, useGetCarPoolByCitiesLazyQuery, useGetProfileQuery } from "../gql/generated/schema";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Trajet({ navigation }) {

    /** Les paramètre du DateTimePicker avec la convertion de la date */
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const transformDate = date.toLocaleDateString('en-US', { year: 'numeric' })
        + "-"
        + date.toLocaleDateString('en-US', { month: '2-digit' })
        + "-"
        + date.toLocaleDateString('en-US', { day: '2-digit' })
        + "T"
        + date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    /************************************* */

    const { data: currentUser, client } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    const [createCarPool] = useCreateCarPoolMutation();
    const [departureCity, setDepartureCity] = useState("");
    const [arrivalCity, setArrivalCity] = useState("");
    const [passengerNumber, setPassengerNumber] = useState("");
    const [messagePropose, setMessagePropose] = useState("");
    const [error, setError] = useState("");
    const [driverId, setDriverId] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [GetCarPoolByCities] = useGetCarPoolByCitiesLazyQuery();
    const passengerId = "";

    useEffect(() => {
        if (currentUser) {
            setDriverId(currentUser.profile.id);
        }
    }, [currentUser]);

    function handleToggle() {
        setToggle(!toggle);
    }

    async function createNewCarpool() {
        setError("");
        setMessagePropose("");
        try {
            await createCarPool({
                variables: {
                    data: {
                        departureCity,
                        arrivalCity,
                        departureDateTime: transformDate,
                        passengerNumber,
                        driverId,
                        passengerId,
                    },
                },
            });
            setMessagePropose("Votre trajet a bien été enregistré !");
        } catch (err) {
            console.error(error);
            setError("invalid credentials");
        } finally {
            client.resetStore();
        }
    }

    // fait la recherche, puis l'envoie sur la page CarPoolList au moment de la navigation
    async function sendResearchInOtherPage() {
        setError("");
        try {
            const carPoolToDisplay = await GetCarPoolByCities({
                variables: {
                    data: {
                        arrivalCity,
                        departureCity,
                    },
                },
            });
            navigation.navigate('Liste de covoiturages', {
                carPoolToDisplay: carPoolToDisplay.data?.getCarPoolByCities
            });
        } catch (err) {
            console.error(err);
            setError("erreur lors de la recherche");
        }
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View>
                    <Text style={styles.title}>{toggle ? "Recherchez un trajet" : "Proposez votre trajet"}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(val => setDepartureCity(val))}
                        value={departureCity}
                        placeholder="Ville de départ"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(val => setArrivalCity(val))}
                        value={arrivalCity}
                        placeholder="Ville d'arrivée"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(val => setPassengerNumber(val))}
                        value={passengerNumber}
                        placeholder="Nombre de passager"
                    />
                    <SafeAreaView>
                        <Pressable style={styles.calendarButtons} onPress={showDatepicker}>
                            <Text style={styles.calendarButtonsText}>{date.toLocaleDateString()}</Text>
                        </Pressable>
                        <Pressable style={styles.calendarButtons} onPress={showTimepicker}>
                            <Text style={styles.calendarButtonsText}>{date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}</Text>
                        </Pressable>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                onChange={onChange}
                            />
                        )}
                    </SafeAreaView>
                    <View style={styles.toggle}>
                        <Text style={[styles.textToggle, toggle ? null : styles.textToggleActive]}>Je propose</Text>
                        <Switch
                            style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
                            trackColor={{ false: '#518071', true: '#518071' }}
                            thumbColor={toggle ? '#FFFFFF' : '#FFFFFF'}
                            onValueChange={handleToggle}
                            value={toggle}
                        />
                        <Text style={[styles.textToggle, toggle ? styles.textToggleActive : null]}>Je recherche</Text>
                    </View>
                    <Pressable style={styles.button}
                        onPress={() => {
                            toggle ?
                                sendResearchInOtherPage()
                                :
                                (currentUser ? createNewCarpool() : navigation.navigate('Connexion'));
                        }}
                    >
                        <Text style={styles.textOnButton}>Valider</Text>
                    </Pressable>
                    {error ?
                        <Text style={styles.messageError}>{error}</Text>
                        :
                        <Text style={styles.messageValidate}>{messagePropose}</Text>
                    }
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        marginBottom: 30,
        color: "#518071",
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#686868",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#518071",
        marginTop: 20,
        marginHorizontal: 50,
        borderRadius: 5,
    },
    textOnButton: {
        textAlign: "center",
        paddingVertical: 15,
        paddingHorizontal: 40,
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    toggle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    textToggle: {
        paddingHorizontal: 30,
        fontWeight: "bold",
        color: "#686868",
        fontSize: 16,
    },
    textToggleActive: {
        color: "#518071",
    },
    messageValidate: {
        textAlign: "center",
        marginTop: 10,
    },
    messageError: {
        color: 'red',
        textAlign: "center",
        marginTop: 10,
    },
    calendarButtons: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#686868",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    calendarButtonsText: {
        color: '#888888',
    },
    logout: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    }
});