import { TouchableOpacityProps } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

interface ButtonProps extends TouchableOpacityProps{
    color: string | undefined
}

export const Container = styled.TouchableOpacity<ButtonProps>`
    width: 100%;

    padding: 19px;
    align-items: center;
    justify-content: center;

    background-color: ${({color, theme}) => color ? color : theme.colors.main};
`

export const Title = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.shape};
`