import { FlatList, StyleSheet, Text, View } from "react-native";
import { useGetProfileQuery, useGetUsersQuery } from "../gql/generated/schema";

export default function Trajet() {

    const { data: getUsers, loading, error } = useGetUsersQuery();
    console.log(getUsers);
    console.log(getUsers?.getUsers[0].email);

    const { data: currentUser, client } = useGetProfileQuery({
        errorPolicy: "ignore",
    });

    return (
        <View style={styles.container}>
            {currentUser?.profile ?
                <View>
                    <View style={styles.title}>
                        <Text>Page des trajets</Text>
                    </View>
                    <Text>test d'affichage de listes d'utilisateurs :</Text>

                    <FlatList
                        data={getUsers?.getUsers}
                        renderItem={({ item }) => (
                            <View>
                                <Text>id : {item.id}</Text>
                                <Text>email : {item.email}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                        ListEmptyComponent={<Text>aucun utilisateur</Text>}
                        ItemSeparatorComponent={() => <View style={styles.list} />}
                    />
                </View>
                :
                <View style={styles.title}>
                    <Text>Vous devez être connecté</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginHorizontal: 10,
    },
    title: {
        alignItems: "center",
        marginBottom: 20,
    },
    list: {
        height: 1,
    },
});