import React from 'react'
import { ActivityIndicator, TouchableOpacityProps } from 'react-native'
import { useTheme } from 'styled-components'

import {
   Container,
   Title,
} from './styles'

interface Props extends TouchableOpacityProps{
    title: string
    color?: string
    enabled?: boolean
    loading?: boolean
}

export function Button({title, color, enabled=true, loading=false,...rest}: Props){
    const theme = useTheme()
   return (
    <Container enabled={enabled} {...rest} 
        color={color} 
        style={{opacity: (enabled===false || loading === true) ? 0.5 : 1}}
    >
        {loading ?
            <ActivityIndicator  color={theme.colors.shape}/>
            :
            <Title>{title}</Title>
        }
    </Container>
   )
}