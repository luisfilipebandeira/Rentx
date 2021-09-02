import React, { useState } from 'react'
import { 
    StatusBar, 
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'

import * as Yup from 'yup'

import { useAuth } from '../../hooks/auth'
import { useTheme } from 'styled-components'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'

import { useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '../../routes/auth.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


import {
   Container,
   Header,
   Title,
   Subtitle,
   Form,
   Footer
} from './styles'

type signInScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>

export function SignIn(){
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {signIn} = useAuth()

    const navigation = useNavigation<signInScreenProp>()

    async function handleSignIn(){
        try{
            const schema = Yup.object().shape({
                email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido"),
                password: Yup.string().required("Senha obrigatória")
            })
    
            await schema.validate({email, password})

            await signIn({email, password})
        }catch(error){
            if(error instanceof Yup.ValidationError){
                Alert.alert(error.message)
            }else{
                Alert.alert('Erro de autenticação, por favor cheque as credênciais')
            }
        }
    }


    return (
    <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                <Header>
                    <Title>Estamos{'\n'}quase lá.</Title>
                    <Subtitle>
                        Faça ser login para começar{'\n'}
                        um experiência incrivel.
                    </Subtitle>
                </Header>

                <Form>
                    <View style={{marginBottom: 10}}>
                    <Input 
                        iconName="mail" 
                        placeholder="E-mail"
                        keyboardType="email-address"
                        value={email}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={setEmail}
                    />
                    </View>
                    <PasswordInput 
                        iconName="lock" 
                        placeholder="Senha"
                        value={password}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                    />
                </Form>

                <Footer>
                    <View style={{marginBottom: 8}}>
                    <Button
                        title="Login"   
                        onPress={handleSignIn}
                        enabled={true}
                        loading={false}
                    />
                    </View>
                    <Button
                        title="Criar conta gratuita"   
                        onPress={() => navigation.navigate("SignUpFirstStep")}
                        enabled={true}
                        loading={false}
                        color={theme.colors.background_secondary}
                        light
                    />
                </Footer>
            </Container>
        </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
    )
}