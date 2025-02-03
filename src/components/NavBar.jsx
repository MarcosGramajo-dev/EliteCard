import React, { useState } from "react";
import { NavLink as RouterNavLink, Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Collapse
} from "@material-tailwind/react";

import { useAuth0 } from "@auth0/auth0-react";

 
export default function NavbarDefault() {
  const [open, setOpen] = React.useState(false);
 
  const toggleOpen = () => setOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false),
    );
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const toggle = () => setIsOpen(!isOpen);

  const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
    });

 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to="/" className="flex items-center" onClick={toggleOpen}>
          Home
        </Link>
 
      </Typography>
      {isAuthenticated && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <Link to="/profile" className="flex items-center" onClick={toggleOpen}>
            Profile
          </Link>
        </Typography>
      )}
      
      {isAuthenticated && (
          <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="flex items-center gap-x-2 p-1 font-medium"
        >
          <Link to="/dashboard" className="flex items-center" onClick={toggleOpen}>
            Dashboard
          </Link>
        </Typography>
      )}

    </ul>
  );
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 ">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="font-semibold mr-4 cursor-pointer py-1.5"
        >
          ELITE CARD
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        { isAuthenticated ?? (
            <div className="flex items-center gap-x-1">
              <Button variant="text" size="sm" className="hidden lg:inline-block" onClick={() => loginWithRedirect()}>
                <span>Log In</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={() => {loginWithRedirect({}); toggleOpen}}
              >
                <span>Sign in</span>
              </Button>
            </div>
        )}

        {
          !isAuthenticated && (
            <div className="flex items-center gap-x-1">
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={() => {logoutWithRedirect(); toggleOpen}}
              >
                <span>Log Out</span>
              </Button>
            </div>
          )
        }

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={toggleOpen}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse  open={open}>
        <div className="container mx-auto">
          {navList}
          { !isAuthenticated ? (
              <div className="flex items-center gap-x-1">
              <Button fullWidth variant="text" size="sm" className="" onClick={() => loginWithRedirect({})}>
                <span>Log In</span>
              </Button>
              <Button fullWidth variant="gradient" size="sm" className="" onClick={() => loginWithRedirect({})}>
                <span>Sign in</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-x-1">
              <Button
                fullWidth
                variant="outlined"
                size="sm"
                onClick={() => {logoutWithRedirect(); toggleOpen}}
                >
                <span>Log Out</span>
              </Button>
          </div>
          )}
        </div>
      </Collapse >
    </Navbar>
  );
}