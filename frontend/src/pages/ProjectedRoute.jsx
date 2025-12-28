import React from 'react'
import { Navigate } from 'react-router-dom'

function ProjectedRoute({children}) {

    const accioConnectToken = document.cookie.includes("accioConnect-token")

    if(!accioConnectToken){
        <Navigate to="/" replace/>
    }


  return children
}

export default ProjectedRoute