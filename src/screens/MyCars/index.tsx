import React, { useState, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'

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

interface CarProps{
   id: string
   user_id: string
   car: CarDTO
   startDate: string
   endDate: string
}

export function MyCars(){
   const [cars, setCars] = useState<CarProps[]>([])
   const [loading, setLoading] = useState(true)

   const theme = useTheme()
   const navigation = useNavigation()

   useEffect(() => {
      async function fetchCars(){
         try{
            const response = await api.get("/schedules_byuser?user_id=1")
            setCars(response.data)
         }catch(err){
            console.log(err)
         }finally{
            setLoading(false)
         }
      }

      fetchCars()
   }, [])

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
                           <CarFooterDate>{item.startDate}</CarFooterDate>
                           <AntDesign 
                              name="arrowright"
                              size={20}
                              color={theme.colors.title}
                              style={{ marginHorizontal: 10 }}
                           />
                           <CarFooterDate>{item.endDate}</CarFooterDate>
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