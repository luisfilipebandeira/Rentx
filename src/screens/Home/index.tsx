import React, { useEffect, useState } from 'react'
import { StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import api from '../../services/api'

import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'

import {CarDTO} from '../../dtos/CarDTO'

import { useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '../../routes/app.stack.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import {
   Container,
   Header,
   HeaderContent,
   TotalCars,
   CarList
} from './styles'

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>
export function Home(){
   const [cars, setCars] = useState<CarDTO[]>([])
   const [loading, setLoading] = useState(true)

   const navigation = useNavigation<homeScreenProp>()

   useEffect(() => {
      async function fecthCars(){
         try{
            const response = await api.get("/cars")
            setCars(response.data)
         }catch(err){
            console.log(err)
         }finally{
            setLoading(false)
         }
      }

      fecthCars()
   }, [])

   if(loading){
      return(
         <LoadAnimation />
      )
   }

   return (
    <Container>
       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <Header>
            <HeaderContent>
               <Logo 
                  width={RFValue(108)}
                  height={RFValue(12)}
               />
               {!loading &&
                  <TotalCars>
                     Total {cars.length} carros
                  </TotalCars>
               }
            </HeaderContent>
        </Header>

        <CarList 
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Car data={item} onPress={() => navigation.navigate('CarDetails', {car: item})} />}
        />
    </Container>
   )
}   