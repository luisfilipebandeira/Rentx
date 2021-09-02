import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

import { RootStackParamList } from '../../../routes/auth.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import * as Yup from 'yup'

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

type signUpFirstStepScreenProp = NativeStackNavigationProp<RootStackParamList, 'SignUpFirstStep'>

export function SignUpFirstStep(){
    const navigation = useNavigation<signUpFirstStepScreenProp>()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [driverLicense, setDriverLicense] = useState('')

    async function handleNextStep(){
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required("Nome obrigatório"),
                email: Yup.string().required("E-mail obrigatório").email("Informe um e-mail válido."),
                driverLicense: Yup.string().required("CNH obrigatória")
            })

            const data = { name, email, driverLicense }

            await schema.validate(data)
            navigation.navigate('SignUpSecondStep', { user: data })
        }catch(error){
            if(error instanceof Yup.ValidationError){
                return Alert.alert(error.message)
            }
        }
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
                    <FormTitle>1. Dados</FormTitle>
                    <InputView>
                        <Input 
                            iconName="user"
                            placeholder="Nome"
                            onChangeText={setName}
                            value={name}
                        />
                    </InputView>
                    <InputView>
                        <Input 
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            value={email}
                        />
                    </InputView>
                    <Input 
                        iconName="credit-card"
                        placeholder="CNH"
                        keyboardType="number-pad"
                        onChangeText={setDriverLicense}
                        value={driverLicense}
                    />
                </Form>

                <Button 
                    title="Próximo"
                    onPress={handleNextStep}
                />

            </Container>
        </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
    )
}