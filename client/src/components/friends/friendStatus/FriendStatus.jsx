
import React from 'react'

import axios from 'axios'


const FriendStatus = ({ id }) => {

    const handleFriendStatus = () => {
        axios({
            method: "post",
            withCredentials: true,
            url: "http://localhost:5000/socialConnection/addFriend",
            data: {id: id}
        })
            .then(res => { console.log("res", res) })
            .catch(err => console.log("err", err))
    }

    return (
        <>
        {console.log("id", id)}
            <div
                onClick={(e) => handleFriendStatus(e)}

            >Add friend</div>



        </>
    )

}

export default FriendStatus