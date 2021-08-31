import React, {useRef, useState} from 'react'
import { FlatList, ViewToken } from 'react-native'
import { Bullet } from '../Bullet'

import {
   Container,
   ImageIndexes,
   CarImageWrapper,
   CarImage,
} from './styles'

interface Props{
    imagesUrl: {
        id: string
        photo: string
    }[]
}

interface ChangeImagePops{
    viewableItems: ViewToken[]
    changed: ViewToken[]
}

export function ImageSlider({imagesUrl}: Props){
    const [imageIndex, setImageIndex] = useState(0)

    const indexChanged = useRef((info: ChangeImagePops) => {
        setImageIndex(info.viewableItems[0].index!)
    }) 

   return (
    <Container>
        <ImageIndexes>
            {imagesUrl.map((item, index) => (
                <Bullet key={item.id} active={index === imageIndex} />
            ))}
        </ImageIndexes>

        <CarImageWrapper>
            <FlatList 
                showsHorizontalScrollIndicator={false}
                data={imagesUrl}
                pagingEnabled
                keyExtractor={item => item.id}
                horizontal
                onViewableItemsChanged={indexChanged.current}
                renderItem={({item}) => (
                    <CarImageWrapper>
                        <CarImage source={{uri: item.photo}} resizeMode="contain" />
                    </CarImageWrapper>
                )}
            />
        </CarImageWrapper>
    </Container>
   )
}