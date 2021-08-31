import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'

import { useNavigation, useRoute } from '@react-navigation/native'

import {getAccessoryIcon} from '../../utils/getAccessoryIcon'

import { CarDTO } from '../../dtos/CarDTO'

import { RootStackParamList } from '../../routes/stack.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolate
} from 'react-native-reanimated'

import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useTheme } from 'styled-components'

import {
   Container,
   Header,
   CarImages,
   Details,
   Description,
   Brand,
   Name,
   Rent,
   Period,
   Price,
   About,
   Accessories,
   Footer
} from './styles'

interface Params{
    car: CarDTO
}

type carDetailsScreenProp = NativeStackNavigationProp<RootStackParamList, 'CarDetails'>

export function CarDetails(){
   const navigation = useNavigation<carDetailsScreenProp>()
   const route = useRoute()
   const { car } = route.params as Params

   const theme = useTheme()

   const scrollY = useSharedValue(0)
   const scrollHandler = useAnimatedScrollHandler(event => {
       scrollY.value = event.contentOffset.y
   })

   const headerStyleAnimation = useAnimatedStyle(() => {
       return{
           height: interpolate(
               scrollY.value,
               [0, 200],
               [200, 70],
               Extrapolate.CLAMP
           )
       }
   })

   const siledCarsStylesAnimation = useAnimatedStyle(() => {
       return {
           opacity: interpolate(
               scrollY.value,
               [0, 150],
               [1, 0],
               Extrapolate.CLAMP
           )
       }
   })

   return (
    <Container>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        
        <Animated.View 
            style={[
                headerStyleAnimation, 
                styles.header, 
                { backgroundColor: theme.colors.background_secondary }]
            }
        >
            <Header>
                <BackButton onPress={() => {}} style={styles.back} />
            </Header>
            <Animated.View style={siledCarsStylesAnimation}>
                <CarImages>
                    <ImageSlider imagesUrl={car.photos} />
                </CarImages>
            </Animated.View>
        </Animated.View>

        <Animated.ScrollView
            contentContainerStyle={{
                paddingHorizontal: 24,
                paddingTop: getStatusBarHeight() + 180
            }}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
        >
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
                {car.accessories.map(accessory => (
                    <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
                ))}
            </Accessories>

            <About>
                {car.about}
                {car.about}
                {car.about}
                {car.about}
                {car.about}
                {car.about}
            </About>
        </Animated.ScrollView>

        <Footer>
            <Button title="Confirmar" onPress={() => navigation.navigate('Scheduling', {car})} />
        </Footer>
    </Container>
   )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1,
    },
    back: {
        marginTop: 24
    }
})