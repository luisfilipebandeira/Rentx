import React from 'react'

import LottieView from 'lottie-react-native'

import loadingCar from '../../assets/load_car.json'

import {
   Container
} from './styles'

export function LoadAnimation(){
    return (
     <Container>
         <LottieView 
            source={loadingCar} 
            autoPlay 
            style={{height: 200}} 
            loop    
        />
     </Container>
    )
}