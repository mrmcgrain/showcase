import LandingPageSignup from "./landingPageSignup/landingPageSignup"
import LandingPageLogin from "./landingPageLogin/LandingPageLogin"
import { Link } from 'react-router-dom'
import Logo from "../../imagess/Logo.png"

import { useEffect } from "react"
// import API from "../../config/api"

import {connect} from "react-redux"

const LandingPage = ({props,authState}) => {
  
  // useEffect(()=>{
  //  API.userAll()
  // },[])

  return (
    <>
    <div className="landingPage-container">
      
      <div className="container-left" >
        <div className="innerleft">
        <img src={Logo} alt="logo" className="logo" />
       
        {/* <Link to="/feed" > bypass auth </Link> */}
        <p className="statement">Connect, Share, and Engage – Welcome to a vibrant community where your voice matters.</p>
      </div>
</div>
      {
        authState.createAcct ? <LandingPageSignup /> : <LandingPageLogin  />
      }
    </div>
    </>
    
  )
}
const mapStateToProps = (state)=>{
  return{
    authState: state.auth
  }
}
export default connect(mapStateToProps,null)(LandingPage)