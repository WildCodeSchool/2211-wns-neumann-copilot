import { useState } from "react"
import { useLoginMutation } from "../gql/generated/schema"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // import de la mutation login.gql
    const[login] = useLoginMutation()
  
    return (<form onSubmit={async (e) => {
        e.preventDefault()
        console.log({email, password});
  
        await login({variables: {data: {email, password}}});
        alert("Ravi de te revoir !");
    }}>
        <label htmlFor="email">
          email : 
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label htmlFor="password">
          password : 
          <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Log in</button>
    </form>
    );
}