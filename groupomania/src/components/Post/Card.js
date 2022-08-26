import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { dateParser } from "../Utils";
import LikeButton from "./LikeButton";


const Card= ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUptated] = useState (true)
    const [textUpdate, setTexteUpdate] = useState (null)
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])

  return (
    <li className="card-container" key={post._id}>
        {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
        ) : (
            <>
                <div className="card-left">
                    <img src={
                        //on map pour aller chercher la photo actuelle de l'utilisateur
                        !isEmpty(usersData[0]) && 
                            usersData.map((user) => {
                                if (user._id === post.posterId) return user.picture;
                                else return null
                            }).join('')
                    }
                    alt="poster-pic"/>
                </div>
                <div className="card-right">
                    <div className="card-header">
                        <div className="pseudo">
                            <h3> 
                            {
                            //on map pour aller chercher la photo actuelle de l'utilisateur
                            !isEmpty(usersData[0]) && 
                                usersData.map((user) => {
                                    if (user._id === post.posterId) return user.pseudo;
                                    else return null
                                }).join('')
                            }
                            </h3>
                        </div>
                            <span>{dateParser(post.createdAt)}</span>
                    </div>
                    {isUpdated ===false && <p>{post.message}</p>}
                    {isUpdated && (
                        <div className="update-post">
                            <textarea
                                defaultValue={post.message}
                            />
                        </div>
                    )}
                    {post.picture && 
                    (<img src={post.picture} alt="card-pic" className="card-pic" />)
                    }
                    {post.video && (
                        <iframe
                            width="500"
                            height="300"
                            src={post.video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={post._id}>
                        </iframe>
                    )}
                    <div className="card-footer">
                        <div className="comment-icon">
                            <img src="./img/icons/message1.svg" alt="comment" />
                            <span>{post.comments.length}</span>
                        </div>
                        <LikeButton post={post}/>
                    </div>

                </div>
            </>
        )}
    </li>
  )
}

export default Card;