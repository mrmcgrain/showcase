import React, { useState } from 'react'
import "./addComment.css"
import axios from 'axios'

const AddComment = ({ authState, obj, handleSetFeeds }) => {

    const [addComment, setAddComment] = useState({
        content: ""
    })


    const handleChange = (e) => {

        setAddComment(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
            authorId: authState.user.userId,   /// ID of comment writer
            authorName: authState.user.username, // Name of comment Writer
            likes: 0,                            // Starting Likes
            OgFeed: obj.OgFeed,                  // OG feed for notifications
            parentAuthorName: obj.authorName,        // Parent Doc Author for notification
            parentAuthorId: obj.author,
            parentDoc: obj._id,
            authorImg: authState.userProfile.profileImg,  /// MAKE REF to user for most recent img




        }))

    }

    const handleAddComment = (e) => {
        // console.log("submiting", addComment)
        axios({
            method: "POST",
            url: "http://localhost:5000/api/addFeedComment",
            data: addComment,
            withCredentials: true,
        }).then(res => {
            console.log("RESRES RES", res)
            handleSetFeeds(res.data)
        }
        )

        handleSetFeeds()
        setAddComment(prev => ({
            prev: ""
        }))
    }


    return (
        <>
            {/* {console.log("ADD COMMENT", addComment)}
            {console.log("authState", authState)}
            {console.log("obj => ", obj)} */}

            <div className='addcomment'>

                <div className='userimg'

                    style={{
                        // border: 'solid black 2px',
                        display: 'flex',
                        justifyContent: 'center',
                        height: '20px',
                        width: '20px',
                        borderRadius: '25px',
                        backgroundImage: `url("http://localhost:5000${authState.userProfile.profileImg}"), url("http://localhost:5000/public/default.jpeg")`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover'
                    }}

                >

                </div>

                <input
                    type="text"
                    value={addComment.content || ""}
                    name="content"
                    className='commentinput'
                    placeholder='  Write a comment...'
                    onChange={(e) => handleChange(e)}

                />


                <button
                className='commentbtn'
                    onClick={(e) => handleAddComment(e)}
                    type="click"
                    placeholder='add'
                    >Comment</button>

            </div>



        </>


    )
}


export default AddComment