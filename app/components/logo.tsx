import React from 'react'

import { Icon } from "@material-ui/core";

import CarletonLogo from "../../public/carleton-logo.jpeg";

export const Logo = () => (
    <Icon>
        <img src={CarletonLogo.src} height={25} width={25} />
    </Icon>
)
