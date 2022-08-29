import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";

const CardComments = ({post})=> {
    const [text, setText] = useState("")
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    const handleComment = () => {}

    return (
        <div className="comments-container">
          {post.comments.map((comment) => {
            return (
                <div
                    className={
                    comment.commenterId === userData._id
                        ? "comment-container client"
                        : "comment-container"
                    }
                    key={comment._id}
                >
                    <div className="left-part">
                        <img //lorsque l'on click sur l'image "comment" on a les commentaires qui s'affiche
                            src={
                            !isEmpty(usersData[0]) &&
                            usersData
                                .map((user) => {
                                if (user._id === comment.commenterId) return user.picture;
                                else return null;
                                })
                                .join("")
                            }
                            alt="commenter-pic"
                        />
                    </div>
                    <div className="right-part">
                        <div className="comment-header">
                            <div className="pseudo">
                                <h3>{comment.commenterPseudo}</h3>
                            </div>
                            <span>{timestampParser(comment.timestamp)}</span>
                        </div>
                        <p>{comment.text}</p>
                    </div>
                </div>
            )
        })}
        {userData._id && (
            <form action="" onSubmit={handleComment} className="comment-form">
                <input type="text" 
                    onChange={(e) => setText(e.target.value)} 
                    value={text} 
                    placeholder="Laisser un commentaire"
                />
                <br/>
                <input type="submit" value="Envoyer"/>
            </form>
        )}
      </div>
  )
}

export default CardComments;