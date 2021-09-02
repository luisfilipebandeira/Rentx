import React, { useState, useEffect } from 'react'

import { useNavigation, useIsFocused } from '@react-navigation/native'

import { StatusBar, FlatList } from 'react-native'
import { useTheme } from 'styled-components'

import { LoadAnimation } from '../../components/LoadAnimation'
import { BackButton } from '../../components/BackButton'

import { CarDTO } from '../../dtos/CarDTO'
import api from '../../services/api'

import {AntDesign} from '@expo/vector-icons'

import { Car } from '../../components/Car'

import {
   Container,
   Header,
   Title,
   Subtitle,
   Content,
   Appointments,
   AppointmentsTitle,
   AppointmentsQuantity,
   CarWrapper,
   CarFooter,
   CarFooterTitle,
   CarFooterPeriod,
   CarFooterDate,
} from './styles'
import { format, parseISO } from 'date-fns'

interface CarProps{
   id: string
   car: CarDTO
   start_date: string
   end_date: string
}

export function MyCars(){
   const [cars, setCars] = useState<CarProps[]>([])
   const [loading, setLoading] = useState(true)
   const screenIsFocus = useIsFocused()

   const theme = useTheme()
   const navigation = useNavigation()

   useEffect(() => {
      async function fetchCars(){
         try{
            const response = await api.get("/rentals")
            const dataFormatted = response.data.map((data: CarProps) => {
               return {
                  id: data.id,
                  car: data.car,
                  start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                  end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
               }
            })
            setCars(dataFormatted)
         }catch(err){
            console.log(err)
         }finally{
            setLoading(false)
         }
      }

      fetchCars()
   }, [screenIsFocus])

   return (
    <Container>
      <Header>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <BackButton color={theme.colors.shape} />
            <Title>Escolha uma {`\n`}data de inicio e {`\n`}fim do aluguel</Title>
            <Subtitle>Conforto, segurança e praticidade</Subtitle>
        </Header>
      {loading ?
         <LoadAnimation />
      :
      <Content>
           <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
           </Appointments>

            <FlatList 
               data={cars}
               keyExtractor={item => item.id}
               showsVerticalScrollIndicator={false}
               renderItem={({item}) => (
                  <CarWrapper>
                     <Car data={item.car} />
                     <CarFooter>
                        <CarFooterTitle>Periodo</CarFooterTitle>
                        <CarFooterPeriod>
                           <CarFooterDate>{item.start_date}</CarFooterDate>
                           <AntDesign 
                              name="arrowright"
                              size={20}
                              color={theme.colors.title}
                              style={{ marginHorizontal: 10 }}
                           />
                           <CarFooterDate>{item.end_date}</CarFooterDate>
                        </CarFooterPeriod>   
                     </CarFooter>
                  </CarWrapper>
               )}
            />
        </Content>
      }
        
    </Container>
   )
}