import React from 'react'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

import {
   Container,
   Header,
   CarImages,
   Content,
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
import { Button } from '../../components/Button'

export function CarDetails(){
   return (
    <Container>
        <Header>
            <BackButton onPress={() => {}} />
        </Header>
        <CarImages>
            <ImageSlider imagesUrl={['https://img2.gratispng.com/20180628/bea/kisspng-audi-rs5-car-audi-q5-audi-s5-motor-sport-5b359e505de2b8.8061450915302405923846.jpg', 'https://catalogo.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841521101233346.png?s=fill&w=440&h=330&q=80&t=true']} />
        </CarImages>

        <Content>
            <Details>
                <Description>
                    <Brand>Audi</Brand>
                    <Name>RS 5 Coupé</Name>
                </Description>
                
                <Rent>
                    <Period>Ao dia</Period>
                    <Price>R$ 580</Price>
                </Rent>
            </Details>
            
            <Accessories>
                <Accessory name="380km/h" icon={speedSvg} />
                <Accessory name="3.2s" icon={accelerationSvg} />
                <Accessory name="800 HP" icon={forceSvg} />
                <Accessory name="Gasolina" icon={gasolineSvg} />
                <Accessory name="Auto" icon={exchangeSvg} />
                <Accessory name="4 pessoas" icon={peopleSvg} />
            </Accessories>

            <About>
                Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza 
                de Sevilla. É um belíssimo carro para quem gosta de acelerar
            </About>
        </Content>

        <Footer>
            <Button title="Confirmar" />
        </Footer>
    </Container>
   )
}