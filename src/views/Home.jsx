import React from "react";
import Fondo from "../assets/fondo.jpg"
import {
    Button,
    Typography
} from '@material-tailwind/react'

import SliderCard from '../components/SliderCard'
import SliderArticles from '../components/SliderArticles'
import Search from "../components/Search";


export default function Home() {
    return(
        <div className="w-full relative flex flex-col justify-center items-center pt-10">
            <img alt="fondo" src={Fondo} className="absolute -top-5 -z-10" />
            <div className="bg-[#eaebea] w-11/12 mx-5 rounded-2xl mt-20 py-5 text-center">
                <Typography
                    variant="h3"
                    className="text-center font-light"
                >
                    Conecta con estilo. 
                    <br />
                    Impacta con
                    <br />
                    <span className="font-semibold bg-gradient-to-b from-goldDark via-gold to-goldDark bg-clip-text text-transparent"> Exclusividad.</span>
                </Typography>

                <div className="bg-gradient-to-r from-goldDark via-gold to-goldDark h-[2px] w-full m-auto mt-5"></div>
                <Button
                    variant="gradient"
                    className="rounded-none m-auto mt-1 bg-gradient-to-r from-goldDark via-gold to-goldDark"
                    size="sm"
                    fullWidth
                    >
                        COMIENZA AHORA
                    </Button>
                <div className="bg-gradient-to-r from-goldDark via-gold to-goldDark h-[2px] w-full m-auto mt-1"></div>
            </div>

            <Search/>
            <SliderCard/>
            <SliderArticles/>

            <br />
            <br />
            <br />
            
        </div>
    )
}