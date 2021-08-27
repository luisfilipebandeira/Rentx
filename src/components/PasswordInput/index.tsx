import React from 'react'

import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import {
   Container,
   InputText,
   IconContainer,
   ChangePasswordVisibilityButton
} from './styles'
import { TextInputProps } from 'react-native'
import { useState } from 'react'

interface InputProps extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name']
    value?: string
}

export function PasswordInput({iconName, value,...rest}: InputProps){
    const theme = useTheme()
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    function handleInputFocus(){
        setIsFocused(true)
    }

    function handleInputBlur(){
        setIsFocused(false)
        setIsFilled(!!value)
    }

    return (
     <Container>
         <IconContainer isFocused={isFocused}>
            <Feather name={iconName} size={24} color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail} />
         </IconContainer>

         <InputText 
            isFocused={isFocused}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            secureTextEntry={isPasswordVisible} 
            {...rest} 
        />

        <ChangePasswordVisibilityButton onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <IconContainer isFocused={isFocused}>
                <Feather name={isPasswordVisible ? "eye" : "eye-off"} size={24} color={theme.colors.text_detail} />
             </IconContainer>
        </ChangePasswordVisibilityButton>
     </Container>
    )
}