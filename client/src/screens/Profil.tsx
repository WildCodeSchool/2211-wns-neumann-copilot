import { useState } from "react"
import { useLoginMutation } from "../gql/generated/schema"

export default function Profil() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // import de la mutation login.gql
    const[login] = useLoginMutation()
  
    return <div></div>
}