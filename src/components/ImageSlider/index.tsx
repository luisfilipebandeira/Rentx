import React, {useRef, useState} from 'react'
import { FlatList, ViewToken } from 'react-native'

import {
   Container,
   ImageIndexes,
   ImageIndex,
   CarImageWrapper,
   CarImage,
} from './styles'

interface Props{
    imagesUrl: string[]
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
            {imagesUrl.map((_, index) => (
                <ImageIndex key={index} active={index === imageIndex} />
            ))}
        </ImageIndexes>

        <CarImageWrapper>
            <FlatList 
                showsHorizontalScrollIndicator={false}
                data={imagesUrl}
                pagingEnabled
                keyExtractor={key => key}
                horizontal
                onViewableItemsChanged={indexChanged.current}
                renderItem={({item}) => (
                    <CarImageWrapper>
                        <CarImage source={{uri: item}} resizeMode="contain" />
                    </CarImageWrapper>
                )}
            />
        </CarImageWrapper>
    </Container>
   )
}