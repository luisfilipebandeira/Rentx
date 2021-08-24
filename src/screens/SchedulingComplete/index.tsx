import React from 'react'

import { StatusBar, useWindowDimensions } from 'react-native'

import LogoSvg from '../../assets/logo_background.svg'
import DoneSvg from '../../assets/done.svg'

import { ConfirmButton } from '../../components/ConfirmButton'

import { useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '../../routes/stack.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import {
   Container,
   Content,
   Title,
   Message,
   Footer
} from './styles'

type schedulingCompleteScreenProp = NativeStackNavigationProp<RootStackParamList, 'SchedulingComplete'>

export function SchedulingComplete(){
   const {width} = useWindowDimensions()
   const navigation = useNavigation<schedulingCompleteScreenProp>()

   return (
    <Container>
       <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
       <LogoSvg width={width} />

       <Content>
          <DoneSvg width={80} height={80} />
          <Title>Carro Alugado!</Title>

          <Message>
            Agora você só precisa ir {'\n'} 
            até uma concessionária da RENTX {'\n'}
            pegar seu automóvel.
          </Message>
       </Content>

       <Footer>
          <ConfirmButton title="Ok" onPress={() => navigation.navigate("Home")} />
       </Footer>
    </Container>
   )
}