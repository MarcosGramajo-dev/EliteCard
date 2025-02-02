
import {
    Input,
    Button
  } from "@material-tailwind/react";

export default function Search(){
    return (
        <div className="bg-grayCustom w-full p-5 mt-20">
            <div className="relative flex w-full gap-2 md:w-max">
                <Input
                type="search"
                color="white"
                label="Find your style..."
                className="pr-20"
                containerProps={{
                    className: "min-w-[288px]",
                }}
                />
                <Button
                size="sm"
                color="white"
                className="!absolute right-1 top-1 rounded"
                >
                Search
                </Button>
            </div>
        </div>
    )
}