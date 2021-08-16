import React, { useEffect, useState } from 'react'
import {StatusBar} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import api from '../../services/api'

import { Car } from '../../components/Car'

import {CarDTO} from '../../dtos/CarDTO'

import { useNavigation } from '@react-navigation/native'

import {
   Container,
   Header,
   HeaderContent,
   TotalCars,
   CarList
} from './styles'
import { Load } from '../../components/Load'

export function Home(){
   const [cars, setCars] = useState<CarDTO[]>([])
   const [loading, setLoading] = useState(true)

   const navigation = useNavigation()

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
         <Load />
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
               <TotalCars>
                  Total 12 carros
               </TotalCars>
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