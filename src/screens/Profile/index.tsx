import React, { useState } from 'react'

import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ScrollView,
    View,
    Alert
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import * as ImagePicker from 'expo-image-picker'

import {Feather} from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton'

import { PasswordInput } from '../../components/PasswordInput'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { useAuth } from '../../hooks/auth'
import { UserDTO } from '../../dtos/UserDto'

import * as Yup from 'yup'

import {
   Container,
   Header,
   HeaderTop,
   HeaderTitle,
   LogoutButton,
   PhotoContainer,
   Photo,
   PhotoButton,
   Content,
   Options,
   Option,
   OptionTitle,
   Sections,
} from './styles'

export function Profile(){
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    
    const {user, signOut, updateUser} = useAuth()
    const [avatar, setAvatar] = useState(user.avatar)
    const [name, setName] = useState(user.name)
    const [driverLicense, setDriverLicense] = useState(user.driver_license)

    const theme = useTheme()
    const navigation = useNavigation()

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
        setOption(optionSelected)
    }

    async function handleSelectAvatar(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        })

        if(result.cancelled){
            return
        }

        if(result.uri){
            setAvatar(result.uri)
        }
    }

    function handleSignOut(){
        Alert.alert(
            'Tem certeza?',
            'Lembre-se, se você sair irá precisar de internet para conectar-se novamente.',
            [{
                text: 'Cancelar',
                onPress: () => {},
            },{
                text: 'Confirmar',
                onPress: () => signOut()
            }]
        )
    }

    async function updateUserData(){
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required("Usuário Obrigatório"),
                driverLicense: Yup.string().required("Número da CNH obrigatória")
            })

            const data = {name, driverLicense}

            await schema.validate(data)

            updateUser({
                id: user.id,
                avatar ,
                driver_license: driverLicense,
                email: user.email,
                name,
                token: user.token,
                user_id: user.user_id
            })

            Alert.alert("Perfil atualizado")
        }catch(error){
            if(error instanceof Yup.ValidationError){
                Alert.alert("Opa", error.message)
            }
            Alert.alert("Não foi possivel atualizar os seus dados!")
        }
    }

    return (
    <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback>
            <ScrollView>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton color={theme.colors.shape} />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={handleSignOut}>
                            <Feather name="power" size={24} color={theme.colors.shape} />
                            </LogoutButton>
                        </HeaderTop>

                        <PhotoContainer>
                            {!!avatar && <Photo source={{uri: avatar}} />}
                            <PhotoButton onPress={handleSelectAvatar}>
                                <Feather name="camera" size={24} color={theme.colors.shape} />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>

                    <Content>
                        <Options>
                            <Option 
                            onPress={() => handleOptionChange('dataEdit')}
                            active={option === 'dataEdit'}
                            >
                                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
                            </Option>
                            <Option 
                            onPress={() => handleOptionChange('passwordEdit')}
                            active={option === 'passwordEdit'}
                        >
                                <OptionTitle active={option === 'passwordEdit'}>Trocar Senha</OptionTitle>
                            </Option>
                        </Options>

                        {option === "dataEdit" ?
                            <Sections>
                                <View style={{marginBottom: 8}}>
                                    <Input 
                                        iconName="user" 
                                        placeholder="Nome"
                                        autoCorrect={false}
                                        defaultValue={user.name}
                                        onChangeText={setName}
                                    />
                                </View>
                                <View style={{marginBottom: 8}}>
                                    <Input 
                                        iconName="mail" 
                                        editable={false}
                                        defaultValue={user.email}
                                    />
                                </View>
                                <View style={{marginBottom: 8}}>
                                    <Input 
                                        iconName="credit-card" 
                                        placeholder="CNH"
                                        keyboardType="number-pad"
                                        defaultValue={user.driver_license}
                                        onChangeText={setDriverLicense}
                                    />
                                </View>
                            </Sections>
                            :
                            <Sections>
                                <View style={{marginBottom: 8}}>
                                    <PasswordInput
                                        iconName="lock" 
                                        placeholder="Senha atual"
                                        autoCorrect={false}
                                    />
                                </View>
                                <View style={{marginBottom: 8}}>
                                    <PasswordInput
                                        iconName="lock" 
                                        placeholder="Nova senha"
                                        autoCorrect={false}
                                    />
                                </View>
                                <View style={{marginBottom: 8}}>
                                    <PasswordInput
                                        iconName="lock" 
                                        placeholder="Repetir senha"
                                        autoCorrect={false}
                                    />
                                </View>
                            </Sections>
                        }  
                        <Button 
                            title="Salvar alterações"
                            onPress={updateUserData}    
                        />
                    </Content>
                </Container>
            </ScrollView>
        </TouchableWithoutFeedback>
     </KeyboardAvoidingView>
    )
}