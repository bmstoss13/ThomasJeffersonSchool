import React, { useContext, useState , useEffect} from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider( {children }) {

    const [currentUser, setCurrentUser] = useState();

    /* we are never going to use this unless we want to make a sign-up page */
    function signup(email, password){
        auth.createUserWithEmailandPassword(email, password);
    }

    useEffect(() =>{
        const unsubscribe = auth.onAuthStateChanged(user =>{
        setCurrentUser(user)
        })

        return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        signup
    }

  return (
    <AuthContext.Provider value = {value}>
        {children}
    </AuthContext.Provider>
  )
}
