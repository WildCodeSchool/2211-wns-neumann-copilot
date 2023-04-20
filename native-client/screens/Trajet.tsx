import { Text, View } from "react-native";
import { useGetProfileQuery } from "../gql/generated/schema";

const { data: currentUser, error } = useGetProfileQuery({
    errorPolicy: "ignore",
});
console.log(currentUser);

export default function Trajet() {
    return (
        <View>
            <Text>hello</Text>
        </View>
    );
    // return null;
}