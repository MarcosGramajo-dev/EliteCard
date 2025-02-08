import { Typography, Navbar, Button } from "@material-tailwind/react";
 
export default function MenuNavigator({setIsOpen}) {
    return(
        <Navbar className="fixed w-full h-14 left-0 bottom-0 rounded-none p-0 flex items-center justify-center z-50">
            <div className="w-full flex justify-around items-center gap-5">

                <Button
                className="w-1/3 text-center flex flex-col items-center justify-center gap-y-2"
                variant="text"
                onClick={() => setIsOpen('My Cards')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-postcard-heart" viewBox="0 0 16 16">
                        <path d="M8 4.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zm3.5.878c1.482-1.42 4.795 1.392 0 4.622-4.795-3.23-1.482-6.043 0-4.622M2.5 5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"/>
                        <path fillRule="evenodd" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"/>
                    </svg>
                    <p> My Cards </p>
                </Button>

                <Button
                className="w-1/3 text-center flex justify-center max-w-20 p-2 "
                variant="filled"
                size="sm"
                onClick={() => setIsOpen('New Card')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Button>

                <Button
                className="w-1/3 text-center flex flex-col items-center justify-center gap-y-2"
                variant="text"
                onClick={() => setIsOpen('Modules')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-view-stacked" viewBox="0 0 16 16">
                    <path d="M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
                    </svg>
                    <p>
                        Modules
                    </p>
                </Button>
            </div>
        </Navbar>
    )
}