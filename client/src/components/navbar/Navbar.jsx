import React, { useState } from "react"
import { FaHome, FaRegComment, FaBell } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi"
import { IoSearch, IoAdd } from "react-icons/io5"
import { TbGridDots } from "react-icons/tb"
import logo1 from "../../imagess/logo1.png"
import { TbDoorExit } from "react-icons/tb";
import MenuModal from "../Modal/MenuModal";
import hacker6 from "../../imagess/hacker6.png"


import { useNavigate, Link } from "react-router-dom";

import { connect } from 'react-redux'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000')




const Navbar = ({ props, authState }) => {
  // console.log("header prop", props, authState)


const [menuModal, setMenuModal] = useState(false)

const handleMenuModal = () => {
  setMenuModal(prev => !prev)
}

  let nav = useNavigate()

  const profile = authState.userProfile.messages

  const handleLogout = (e) => {
    // console.log("logging out")
    // e.preventDefault()
    socket.emit("loggedOut", "loggedOut")

    axios({
      method: "get",
      url: "http://localhost:5000/user/logout",
      withCredentials: true
    }).then(res => {
      console.log("logout", res)
      nav("/")
    }
    )
      .catch(err => console.log("logouterr", err))
    // nav("/")

  }

  function messageCount() {
    let count = 0
    if (authState) {
      console.log("AUTH")
      if (authState.userProfile) {
        console.log("PROFILE`")
      } if (authState.userProfile.messages) {

        for (let i = 0; i < profile.length; i++) {
          count += profile[i].messageCount
          // console.log("WTWTF", profile[i], i, profile[i].messageCount)
        }

      }
      // console.warn("ASDGDSAG", count) 
      return count

    }

  }


  return (

    <>
    {/* {console.log("AUTHstate - NAV", authState)} */}

      <div className="navbar">
        <div className="left-nav">
          <div >
            <img src={logo1} alt="" className="logo1" />
          </div>
          <div className="search2"><IoSearch /></div>
          <input
            type="search"
            name=""
            className="search"
            placeholder="Search"
          />
        </div>


        <div
          className="welcome"
        >
          <p>Welcome back {authState.user.username}</p>
        </div>

        <div className="middle-nav">
          <div className="middle-left-nav">
            <div className="circle icon">
              <Link to="/feed">

                <FaHome />
              </Link>
            </div>
          </div>
          <div className="middle-right-nav">
            <div className="circle icon">
              <Link to="/friends">
                <PiUsersThreeFill />
              </Link>
            </div>

          </div>

        </div>
        
        {/* { modal ? <Modal /> : ""}
          { modal1 ? <Modal1 /> : ""} */}
        <div className="right-nav">
          <div className="circle icon add"><IoAdd /> </div>


          <Link to="/FriendSearch">

            <div className="search1">Find friends</div>

          </Link>



          <div className="circle icon dots" 
          style={{ width: "40px", height: "40px"}}
          onClick={() => handleMenuModal()}
          ><TbGridDots /></div>


          

          <Link to="/messages/">

            <div
              className="circle icon">
                <div className="numberbadge">{messageCount()}</div>
              <FaRegComment />


            </div>
          </Link>








          <Link to="/notification">
            <div
              className="circle icon" >
                <div className="numberbadge">       {Object.keys(authState.userProfile).length
            ?
            (
              <div className="notbubble">

                {authState?.userProfile?.notifications.length ? authState?.userProfile?.notifications.length : 0}

                {/* <Link style={{ fontSize: "26px" }} className="fas fa-bolt" to={`/notifications/${authedUser._id}`}>  </Link> */}
              </div>

            )
            :
            (
              null
            )
          }</div>
              <FaBell />
            </div>
          </Link>

          <div
            className="circle icon"
            onClick={handleLogout}
          ><TbDoorExit />
          </div>

          <div className="circle1">
            {/* <img src={hacker6} alt="" className="img1"/> */}
            <img className="img1" onClick={() => nav("/profile/")} src={`http://localhost:5000${authState.userProfile.profileImg}`} alt="" />
          </div>
        </div>
      </div>
      {menuModal ? <MenuModal /> : null}
    </>
  )
}


const mapStateToProps = (state) => {
  // console.warn("state redux", state)
  return {
    authState: state.auth
  }
}

export default connect(mapStateToProps, null)(Navbar)