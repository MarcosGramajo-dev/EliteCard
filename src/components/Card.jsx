import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";

import NotImage from '../assets/notImage.jpg'
   
export default function ProfileCard({img = '', title = '', link = ''}) {


return (

    <div className="min-w-[200px] min-h-[100px] flex flex-col justify-between">
        <div  className="min-h-[100px]">
            <img src={img ? img : NotImage} alt="picture" />
        </div>
        <div className="text-white my-3">
            {title}
        </div>
    </div>
);
}