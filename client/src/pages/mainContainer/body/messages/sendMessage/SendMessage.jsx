import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { ImImages } from "react-icons/im";
import axios from 'axios'


const SendMessage = ({handleSetMessage, handleSubmitMessage}) => {


    return (



        <div className="messagerightbottom">
            <div className="sendmessageicon">
                <div className="plus"><FaPlus /></div>
                <div className="attachimg"><ImImages /></div>
            </div>

            <div className="sendmessageinput">

                <input
                    onChange={(e) => handleSetMessage(e)}
                    type="text"
                    name="message"
                    className="messageinput"
                    placeholder="...?" />

            </div>

            <div className="sendmessagebtn">

                <div
                    onClick={handleSubmitMessage}
                    className="bttn">Send</div>

            </div>
        </div>




    )
}

export default SendMessage