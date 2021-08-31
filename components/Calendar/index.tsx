import React from 'react'

import {Feather} from '@expo/vector-icons'

import {
    Calendar as CustomCalendar, 
    LocaleConfig, 
    DateCallbackHandler
} from 'react-native-calendars'

import { useTheme } from 'styled-components'
import { generateInterval } from './generateInterval'

import { ptBR } from './localeConfig'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

interface MarkedDatesProps{
    [date: string] : {
        color: string
        textColor: string
        disabled?: boolean
        disableTouchEvent?: boolean
    }
}

interface DayProps {
    dateString: string
    day: number
    month: number
    year: number
    timestamp: number
}

interface CalendarProps{
    marketDates: MarkedDatesProps
    onDayPress: DateCallbackHandler
}

function Calendar({marketDates, onDayPress}: CalendarProps){
   const theme = useTheme()
   return (
    <CustomCalendar 
        renderArrow={(direction) => 
            <Feather size={24} color={theme.colors.text} name={direction == 'left' ? "chevron-left" : "chevron-right"} />
        }
        headerStyle={{
            backgroundColor: theme.colors.background_secondary,
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.text_detail,
            paddingBottom: 10,
            marginBottom: 10
        }}

        theme={{
            textDayHeaderFontSize: 10,
            textMonthFontSize: 20,
            monthTextColor: theme.colors.title,
            arrowStyle: {
                marginHorizontal: -15
            }
        }}

        firstDay={1}
        minDate={new Date()}
        markingType="period"
        markedDates={marketDates}
        onDayPress={onDayPress}
    />
   )
}

export {
    Calendar,
    MarkedDatesProps,
    DayProps,
    generateInterval
}