import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'

export const CarouselHome = ({movies}) => {
    const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  
  
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full relative group"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="w-full">
        {movies.map((movie, index) => (
          <CarouselItem key={index}>
            <div className="w-full h-75 md:h-100 overflow-hidden">
                <img src={movie.img} alt={movie.title} className='w-full h-full object-cover'/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

