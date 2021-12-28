import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'

import {Feather} from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton'

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
} from './styles'

export function Profile(){
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')

    const theme = useTheme()
    const navigation = useNavigation()

    function handleSignOut(){

    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
        setOption(optionSelected)
    }

    return (
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
                 <Photo source={{uri: 'https://avatars.githubusercontent.com/u/38268210?v=4'}} />
                 <PhotoButton onPress={() => {}}>
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
         </Content>
     </Container>
    )
}