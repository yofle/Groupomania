import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import { dateParser } from "../Utils";
import CardComments from "./CardComment";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";


const Card= ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUptated] = useState (false)
    const [textUpdate, setTexteUpdate] = useState (null)
    const [showComments, setShowComments] =useState (false);

    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    //modification post
    const updateItem = ()=> {
        if (textUpdate) {
        dispatch(updatePost(post._id, textUpdate))
        }
        setIsUptated(false);
    }

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
                                onChange={(e) => setTexteUpdate(e.target.value)}
                            />
                            <div className ="button-container">
                                <button className="btn" onClick={updateItem}>
                                    Valider modification
                                </button>
                            </div>
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
                    {userData._id === post.posterId && (
                        <div className="button-container">
                            <div onClick={() => setIsUptated(!isUpdated/* permet lors du click d'avoir le btn et de l'enlever*/)}>
                                <img src="./img/icons/edit.svg" alt="edit"/>
                            </div>
                            <DeleteCard id={post._id} />
                        </div>
                    )}
                    <div className="card-footer">
                        <div className="comment-icon">
                            <img 
                            onClick={() => setShowComments(!showComments)} 
                            src="./img/icons/message1.svg" 
                            alt="comment" />
                            <span>{post.comments.length}</span>
                        </div>
                        <LikeButton post={post}/>
                    </div>
                        {showComments && <CardComments post ={post}/>}
                </div>
            </>
        )}
    </li>
  )
}

export default Card;