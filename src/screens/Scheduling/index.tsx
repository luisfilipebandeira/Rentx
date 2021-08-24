import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { BackButton } from '../../components/BackButton'
import { Button } from '../../components/Button'

import { Calendar, DayProps, generateInterval, MarkedDatesProps} from '../../components/Calendar'
import { format } from 'date-fns'

import { StatusBar } from 'react-native'

import ArrowSvg from '../../assets/arrow.svg'

import { useNavigation, useRoute } from '@react-navigation/native'

import { getPlatformDate } from '../../utils/getPlatformDate'

import { CarDTO } from '../../dtos/CarDTO'

import { RootStackParamList } from '../../routes/stack.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import {
   Container,
   Header,
   Title,
   RentalPeriod,
   DateInfo,
   DateTitle,
   DateValue,
   Content,
   Footer
} from './styles'

interface Params{
    car: CarDTO
}

interface IRentalPeriod{
    startFormatted: string
    endFormatted: string
}

type schedulingScreenProp = NativeStackNavigationProp<RootStackParamList, 'Scheduling'>

export function Scheduling(){
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDatesProps>({} as MarkedDatesProps)
    const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod)

    const theme = useTheme()
    const navigation = useNavigation<schedulingScreenProp>()

    const route = useRoute()
    const {car} = route.params as Params

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
        let end = date

        if(start.timestamp > end.timestamp){
            start = end
            end = start
        }

        setLastSelectedDate(end)
        const interval = generateInterval(start, end)
        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0]
        const endDate = Object.keys(interval)[Object.keys(interval).length -1]

        setRentalPeriod({
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
        })
    }

    function handleNavigation(){
        navigation.navigate('SchedulingDetails', {
            car,
            dates: Object.keys(markedDates)
        })
    }

   return (
    <Container>
        <Header>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <BackButton color={theme.colors.shape} />
            <Title>Escolha uma {`\n`}data de inicio e {`\n`}fim do aluguel</Title>

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>De</DateTitle>
                    <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
                </DateInfo>

                <ArrowSvg />

                <DateInfo>
                    <DateTitle>Até</DateTitle>
                    <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
                </DateInfo>
            </RentalPeriod>
        </Header>

        <Content>
            <Calendar
                marketDates={markedDates}
                onDayPress={handleChangeDate}
            />
        </Content>

        <Footer>
            <Button enabled={!!rentalPeriod.endFormatted} title="Confirmar" onPress={handleNavigation} />
        </Footer>
    </Container>
   )
}