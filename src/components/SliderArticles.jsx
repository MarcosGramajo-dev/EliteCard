import React from "react"
import Article from "./Article"
import { Typography } from "@material-tailwind/react"

export default function SliderCard (){

    let img = "https://th.bing.com/th/id/OIP.RsRqKN3sDAJ2xSj2kdqSNAHaHs?rs=1&pid=ImgDetMain";
    let title = "Card";

    return(
        <div className="bg-grayCustom p-5 h-50 w-full">
            <Typography
            variant="h4"
            className="text-white pb-5 font-light"
            >
                Mas vistos
            </Typography>
            <div className="flex overflow-x-scroll gap-5">
                <Article img={img} title={"Tarjeta 1"} isPremium={false}/>
                <Article img={img} title={"Tarjeta 2"}/>
            </div>
        </div>
    )
}