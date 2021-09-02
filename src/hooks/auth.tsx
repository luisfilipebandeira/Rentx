import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'

import api from '../services/api'
import { database } from '../databases'
import { User as ModelUser } from '../databases/model/User'

import {UserDTO} from '../dtos/UserDto'

interface SignInCredentials{
    email: string
    password: string
}

interface AuthContextData{
    user: UserDTO
    signIn: (credentials: SignInCredentials) => Promise<void>
    signOut: () => Promise<void>
    updateUser(user: UserDTO): void
}

interface AuthProviderProps{
    children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps){
    const [data, setData] = useState<UserDTO>({} as UserDTO)

    async function signIn({email, password}: SignInCredentials){
        try{
            const response = await api.post('/sessions', {
                email,
                password
            })
    
            const { token, user } = response.data
            api.defaults.headers.authorization = `Bearer ${token}`

            setData({...user, token})
        }catch(error){
            console.log(error)
        }
    }

    async function signOut(){
        try{
            setData({} as UserDTO)
        }catch(error){
            throw new Error(error)
        }
    }

    async function updateUser(user: UserDTO){
        try{
            setData(user)
        }catch(error){
            throw new Error(error)
        }
    }

    useEffect(() => {
        async function loadUserData(){
            const userCollection = database.get<ModelUser>('users')
            const response = await userCollection.query().fetch()

            if(response.length > 0){
                const userData = response[0]._raw as unknown as UserDTO
                api.defaults.headers.authorization = `Bearer ${userData.token}`
                setData(userData)
            }
        }

        loadUserData()
    },[])

    return (
        <AuthContext.Provider value={{
            user: data,
            signIn,
            signOut,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}


function useAuth(): AuthContextData{
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }