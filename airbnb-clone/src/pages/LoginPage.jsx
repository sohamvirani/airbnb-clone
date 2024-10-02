import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../common/UserContext";

const LoginPage = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ redirect, setRedirect ] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('login', {
        email, password
      });
      setUser(data);
      alert('Login successful.');
      setRedirect(true);
    } catch(err) {
      alert('Login failed.')
    }
  }

  if (redirect) {
    return <Navigate to={'/'}/>
  }

  return (
    <div className="mt-4 grow flex items-center justify-center">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login page</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Do not have an account yet? <Link to={'/register'} className="underline text-black">Register now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage