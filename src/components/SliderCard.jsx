import React from "react"
import Card from "./Card"
import { Typography } from "@material-tailwind/react"

export default function SliderCard (){

    let img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmD5LDETnDoug6dzPqtQxYypnsFl3TcA0_aQ&s";
    let title = "Card";

    return(
        <div className="bg-grayCustom mt-20 p-5 h-50 w-full">
            <Typography
            variant="h4"
            className="text-white text-center pb-5 font-light"
            >
                Módulos dinámicos
            </Typography>
            <div className="flex overflow-x-scroll gap-5">
                <Card img={img} title={title}/>
                <Card img={img} title={title}/>
                <Card img={img} title={title}/>
                <Card img={img} title={title}/>
                <Card img={img} title={title}/>
                <Card img={img} title={title}/>
                <Card img={img} title={title}/>
            </div>
        </div>
    )
}