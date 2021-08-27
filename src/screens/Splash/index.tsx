import React, {useEffect} from 'react'

import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'

import Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    withTiming,
    runOnJS,
    interpolate,
    Extrapolate
} from 'react-native-reanimated'

import { useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '../../routes/auth.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import {
   Container
} from './styles'

type splashScreenProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>

export function Splash(){
    const splashAnimation = useSharedValue(0)

    const navigation = useNavigation<splashScreenProp>()

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [0, -50],
                        Extrapolate.CLAMP
                    )
                }
            ]
        } 
    })

    const LogoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .5, 1]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [-50, 0],
                        Extrapolate.CLAMP    
                    )
                }
            ]
        } 
     })

    function startApp(){
        navigation.navigate('SignIn')
    }

     useEffect(() => {
        splashAnimation.value = withTiming(
            50, 
            {duration: 1500}, 
            () => {
                'worklet';
                runOnJS(startApp)()
            }
        )
     }, [])
    
    return (
     <Container>
         <Animated.View style={[brandStyle, {position: 'absolute'}]}>
             <BrandSvg width={80} height={50} />
         </Animated.View>

         <Animated.View style={[LogoStyle, {position: 'absolute'}]}>
             <LogoSvg width={180} height={20} />
         </Animated.View>
     </Container>
    )
}