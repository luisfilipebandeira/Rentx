import React from 'react'

import { TouchableOpacityProps } from 'react-native'

import {CarDTO} from '../../dtos/CarDTO'

import {
   Container,
   Details,
   Brand,
   Name,
   About,
   Rent,
   Period,
   Price,
   Type,
   CarImage,
} from './styles'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'


interface Props extends TouchableOpacityProps{
    data: CarDTO
}

export function Car({data, ...rest}: Props){
    const MotorIcon = getAccessoryIcon(data.fuel_type)
   return (
     <Container {...rest}>
         <Details>
             <Brand>{data.brand}</Brand>
             <Name>{data.name}</Name>

             <About>
                 <Rent>
                     <Period>{data.rent.period}</Period>
                     <Price>R$ {data.rent.price}</Price>
                 </Rent>

                 <Type>
                    <MotorIcon />
                 </Type>
             </About>
         </Details>

         <CarImage resizeMode="contain" source={{uri: data.thumbnail}} />
     </Container>
   )
}