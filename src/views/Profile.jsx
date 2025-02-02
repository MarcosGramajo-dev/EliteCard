import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  Button,
  Typography,
  Avatar
} from '@material-tailwind/react'

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ProfileComponent = () => {
  const { user } = useAuth0();

  return (
    <div className="pt-24">
        <div className="bg-[#eaebea] w-11/12 mx-5 rounded-2xl py-5 text-center">
          <Avatar src={user.picture} alt="avatar" size="xxl" />
          <Typography
              variant="h5"
              className="text-center font-light"
          >
              {user.name}
          </Typography>
          <Typography
              variant="small"
              className="text-center font-light"
          >
              {user.email}
          </Typography>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});