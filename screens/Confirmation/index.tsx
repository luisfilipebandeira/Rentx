import React from 'react'

import { StatusBar, useWindowDimensions } from 'react-native'

import LogoSvg from '../../assets/logo_background.svg'
import DoneSvg from '../../assets/done.svg'

import { ConfirmButton } from '../../components/ConfirmButton'

import { useNavigation, useRoute } from '@react-navigation/native'

import { RootStackParamList } from '../../routes/stack.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import {
   Container,
   Content,
   Title,
   Message,
   Footer
} from './styles'

interface Props{
   title: string
   message: string
   nextScreenRoute: string
}

interface Params {
   title: string
   message: string
   nextScreenRoute: string
}

type confirmationCompleteScreenProp = NativeStackNavigationProp<RootStackParamList, 'Confirmation'>

export function Confirmation(){
   const {width} = useWindowDimensions()
   const navigation = useNavigation<confirmationCompleteScreenProp>()
   const route = useRoute()

   const { title, message, nextScreenRoute } = route.params as Params

   return (
    <Container>
       <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
       <LogoSvg width={width} />

       <Content>
          <DoneSvg width={80} height={80} />
          <Title>{title}</Title>

          <Message>
            {message}
          </Message>
       </Content>

       <Footer>
          <ConfirmButton title="Ok" onPress={() => navigation.navigate(nextScreenRoute)} />
       </Footer>
    </Container>
   )
}