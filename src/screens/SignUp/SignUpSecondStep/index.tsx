import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { PasswordInput } from '../../../components/PasswordInput'
import { Button } from '../../../components/Button'

import { RootStackParamList } from '../../../routes/stack.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import api from '../../../services/api'

import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'

import {
   Container,
   Header,
   Steps,
   Title,
   Subtitle,
   Form,
   FormTitle,
   InputView
} from './styles'

interface Params{
    user: {
        name: string
        email: string
        driverLicense: string
    }
}

type signUpSecondStepScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignUpSecondStep'>

export function SignUpSecondStep(){
    const navigation = useNavigation<signUpSecondStepScreenProp>()
    const theme = useTheme()
    const route = useRoute()

    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const { user } = route.params as Params

    async function handleRegister(){
        if(!password || !passwordConfirm){
            return Alert.alert("Informe a senha e/ou o campo de confirmar senha")
        }
        if(password !== passwordConfirm){
            return Alert.alert("As senhas nã são iguais")
        }

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password
        }).then(() => {
            navigation.navigate("Confirmation", {
                title: 'Conta Criada!', 
                message: `Agora é só fazer login\ne aproveitar`, 
                nextScreenRoute: 'SignIn'
            })
        }).catch(() => {
            Alert.alert("Não foi possivel cadastrar!")
        })
    }

    return (
     <KeyboardAvoidingView behavior="position" enabled>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <BackButton />
                    <Steps>
                        <Bullet active />
                        <Bullet />
                        <Bullet />
                    </Steps>
                </Header>

                <Title>Crie sua {'\n'} conta</Title>
                <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

                <Form>
                    <FormTitle>2. Senha</FormTitle>
                    <InputView>
                        <PasswordInput 
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </InputView>
                    <InputView>
                        <PasswordInput
                            iconName="lock"
                            placeholder="Repetir Senha"
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />
                    </InputView>
                    
                </Form>

                <Button 
                    title="Cadastrar"
                    color={theme.colors.success}
                    onPress={handleRegister}
                />

            </Container>
        </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
    )
}