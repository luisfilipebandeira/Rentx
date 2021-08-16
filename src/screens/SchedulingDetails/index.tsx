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
import { MarkedDatesProps } from '../../components/Calendar'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getPlatformDate } from '../../utils/getPlatformDate'

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

interface RentalPeriod{
    start: string
    end: string
}

export function SchedulingDetails(){
   const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

   const theme = useTheme()
   const navigation = useNavigation()

   const route = useRoute()
   const {car, dates} = route.params as Params

   const rentTotal = Number(dates.length * car.rent.price)

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
                    <Period>{car.rent.period}</Period>
                    <Price>R$ {car.rent.price}</Price>
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
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue>{rentalPeriod.end}</DateValue>
                </DateInfo>
            </RentalPeriod>

            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RentalPriceQuota>{`R$${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
                    <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                </RentalPriceDetails>
            </RentalPrice>
        </Content>

        <Footer>
            <Button title="Confirmar" onPress={() => navigation.navigate("SchedulingComplete")} />
        </Footer>
    </Container>
   )
}