import { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useGetProfileQuery, useLoginMutation, useLogoutMutation, useUpdateProfileMutation } from "../gql/generated/schema";
import * as SecureStore from 'expo-secure-store';
import { registerForPushNotificationsAsync } from "../utils/notifications";

export default function Login() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { data: currentUser, client } = useGetProfileQuery({
        errorPolicy: "ignore",
    });
    const [login] = useLoginMutation();
    const [logout] = useLogoutMutation();
    const [error, setError] = useState("");

    const [updateProfile] = useUpdateProfileMutation();

    useEffect(() => {
        registerForPushNotificationsAsync().then((expoNotificationsToken) => {
            if (expoNotificationsToken)
                updateProfile({
                    variables: {
                        data:
                            { expoNotificationsToken }
                    }
                });
        });
    }, [currentUser?.profile.id]);

    return (
        <View style={styles.container}>
            {currentUser?.profile ?
                <View>
                    <Text style={styles.logoutText}>Vous êtes connecté avec l'adresse Email :
                        <Text style={styles.mail}> {currentUser?.profile.email}</Text>
                    </Text>
                    <Pressable style={styles.button}
                        onPress={async () => {
                            await logout();
                            client.resetStore();
                            SecureStore.setItemAsync('token', "");
                        }}
                    >
                        <Text style={styles.textOnButton}>Se déconnecter</Text>
                    </Pressable>
                </View>
                :
                /* note :
                https://stacklima.com/comment-faire-disparaitre-le-clavier-dans-react-native-sans-cliquer-sur-le-bouton-retour/
                la balise <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> permetde quiter le clavier en tapant à l'extérieur
                sans ça, lorsque l'on change une valeur dans un input, il faut appuyer sur 'entrer' par faire disparaitre le clavier !!
                */
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View>
                        <Text style={styles.title}>Entrez vos identifiants</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(val => setCredentials({ ...credentials, email: val }))}
                            value={credentials.email}
                            placeholder="Votre adresse email"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(val => setCredentials({ ...credentials, password: val }))}
                            value={credentials.password}
                            placeholder="Votre mot de passe"
                        />
                        {error && <Text style={styles.error}>{error}</Text>}
                        <Pressable style={styles.button}
                            onPress={async () => {
                                console.log(credentials);
                                try {
                                    setError('');
                                    const res = await login({ variables: { data: credentials } });
                                    SecureStore.setItemAsync('token', res.data?.login as string);
                                    console.log({ res });
                                } catch (err) {
                                    setError("Email ou mot de passe incorrect");
                                } finally {
                                    client.resetStore();
                                }
                            }}
                        >
                            <Text style={styles.textOnButton}>Se connecter</Text>
                        </Pressable>
                    </View>
                </TouchableWithoutFeedback>
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
    error: {
        color: "red",
        textAlign: "center",
        fontSize: 16,
        marginTop: 10,
    },
    logoutText: {
        textAlign: 'center',
        margin: 20,
        fontSize: 16,
    },
    mail: {
        fontWeight: "bold",
    }
});