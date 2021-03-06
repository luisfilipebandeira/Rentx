import React, { useState, useEffect } from 'react'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'

import { format } from 'date-fns'

import { Feather } from '@expo/vector-icons'

import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'

import { CarDTO } from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlatformDate'

import api from '../../services/api'
import { Alert } from 'react-native'

import { RootStackParamList } from '../../routes/app.stack.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import {
   Container,
   Header,
   CarImages,
   Content,
   Details,
   Description,
   Brand,
   Name,
   Rent,
   Period,
   Price,
   Accessories,
   RentalPeriod,
   CalendarIcon,
   DateInfo,
   DateTitle,
   DateValue,
   RentalPrice,
   RentalPriceLabel,
   RentalPriceDetails,
   RentalPriceQuota,
   RentalPriceTotal,
   Footer
} from './styles'


interface Params{
    car: CarDTO
    dates: string[]
}

interface IRentalPeriod{
    start: string
    end: string
}

type schedulingDetailsScreenProp = NativeStackNavigationProp<RootStackParamList, 'SchedulingDetails'>

export function SchedulingDetails(){
   const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod)
   const [loading, setLoading] = useState(false)

   const theme = useTheme()
   const navigation = useNavigation<schedulingDetailsScreenProp>()

   const route = useRoute()
   const {car, dates} = route.params as Params

   const rentTotal = Number(dates.length * Number(car.price))

   async function handleConfirmRental(){
    setLoading(true)
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

    const unavailable_dates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates
    ]

    await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })

    api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates
    })
    .then(() => navigation.navigate('Confirmation', {
        title: 'Carro alugado!', 
        message: `Agora voc?? s?? precisa ir\nat?? a concession??ria da RENTX\npegar o seu autom??vel.`, 
        nextScreenRoute: 'Home'}))
    .catch(() => {
        setLoading(false)
        Alert.alert('N??o foi possivel concluir o agendamento.')
    })  
   }

   useEffect(() => {
    setRentalPeriod({
        start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
   }, [])

   return (
    <Container>
        <Header>
            <BackButton onPress={() => {}} />
        </Header>
        <CarImages>
            <ImageSlider imagesUrl={car.photos} />
        </CarImages>

        <Content>
            <Details>
                <Description>
                    <Brand>{car.brand}</Brand>
                    <Name>{car.name}</Name>
                </Description>
                
                <Rent>
                    <Period>{car.period}</Period>
                    <Price>R$ {car.price}</Price>
                </Rent>
            </Details>
            
            <Accessories>
                {car.accessories.map((item) => {
                    <Accessory name={item.name} icon={getAccessoryIcon(item.type)} />
                  })  
                }
            </Accessories>

            <RentalPeriod>
                <CalendarIcon>
                    <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
                </CalendarIcon>

                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue>{rentalPeriod.start}</DateValue>
                </DateInfo>

                <Feather name="chevron-right" size={RFValue(24)} color={theme.colors.shape} />

                <DateInfo>
                    <DateTitle>AT??</DateTitle>
                    <DateValue>{rentalPeriod.end}</DateValue>
                </DateInfo>
            </RentalPeriod>

            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RentalPriceQuota>{`R$${car.price} x${dates.length} di??rias`}</RentalPriceQuota>
                    <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                </RentalPriceDetails>
            </RentalPrice>
        </Content>

        <Footer>
            <Button 
                title="Confirmar" 
                color={theme.colors.success} 
                onPress={handleConfirmRental}
                enabled={!loading}
                loading={loading}
             />
        </Footer>
    </Container>
   )
}