import React, { useEffect, useState } from 'react'
import { StatusBar, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import api from '../../services/api'

import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

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

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'HomeInitial'>
export function Home(){
   const [cars, setCars] = useState<CarDTO[]>([])
   const [loading, setLoading] = useState(true)

   const netInfo = useNetInfo()
   const navigation = useNavigation<homeScreenProp>()

   useEffect(() => {
      let isMounted = true

      async function fecthCars(){
         try{
            const response = await api.get("/cars")
            if(isMounted){
               setCars(response.data)
            }
         }catch(err){
            console.log(err)
         }finally{
            if(isMounted){
               setLoading(false)
            }
         }
      }

      fecthCars()
      return () => {
         isMounted = false
      }
   },[])

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