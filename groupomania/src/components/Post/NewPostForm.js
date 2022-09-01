import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";


const NewPostForm = ()=> {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);//image qu'on affiche que l'on voit
    const [file, setFile] = useState();//fichier contenant l'image
    const [video, setVideo] = useState('')
    const userData = useSelector((state) => state.userReducer);//contenu dans notre store pour le redux
    const dispatch = useDispatch();

    const handlePost = async () => {
        if (message || postPicture || video) {
          const data = new FormData();
          data.append('posterId', userData._id);
          data.append('message', message);
          if (file) data.append("file", file);//tester si l'image existe pour envoyer
          data.append('video', video);

         await dispatch(addPost(data));//envoie à la base de donnée
          dispatch(getPosts());//demande à la base de donnée pour pouvoir editer
          cancelPost();
        } else {
          alert("Veuillez entrer un message")
        }
      }

    const handlePicture =(e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));//importer l'image
        setFile(e.target.files[0]);//envoyer l'image
        setVideo('');
    };

    const cancelPost=() => {
        setMessage('');
        setPostPicture('');
        setFile('')
        setVideo('');
    }

    useEffect(() => {
        //tester si l'élément est pas vide
    if (!isEmpty(userData)) setIsLoading(false);

        const handleVideo = () => {
            let findLink = message.split(" ");
            for (let i = 0; i < findLink.length; i++) {
              if (
                findLink[i].includes("https://www.yout") ||
                findLink[i].includes("https://yout")
              ) {
                let embed = findLink[i].replace("watch?v=", "embed/");
                setVideo(embed.split("&")[0]);
                findLink.splice(i, 1);
                setMessage(findLink.join(" "));
                setPostPicture('');
              }
            }
          };
          handleVideo();

    }, [userData, message, video])

    return(
        <div className="post-container">
            {isLoading ? (
            <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Que se passe t'il???"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {message || postPicture || video.length > 20 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userData.picture} alt="user-pic"/>
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())/*avoir la date du message en temps réel*/}</span>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        <img src={postPicture} alt=""/>
                                        {video && (
                                            <iframe
                                                src={video}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}
                                            ></iframe>
                                            )}
                                    </div>
                                </div>
                            </li>
                        ) : null}
                    <div className="footer-form">
                        <div className="icon">
                        {isEmpty(video) && (
                            <>
                            <img src="./img/icons/picture.svg" alt="img"/>
                            <input 
                                type="file" 
                                id="file-upload" 
                                name="file" 
                                accept=".jpg, .jpeg, .png" 
                                onChange={(e) => handlePicture(e)}
                            />
                            </>
                        )}
                        {video && (
                            <button onClick={() => setVideo("")}>Supprimer la video</button>
                        )}
                        </div>
                        <div className="btn-send">
                            {message || postPicture || video.length > 20 ? (
                            <button className="cancel" onClick={cancelPost}>Annuler</button>
                            ) : null}
                            <button className="send" onClick={handlePost}>Envoyer</button> 
                        </div>
                    </div>
                    </div>
                </>
            )}
            
        </div>
    )
}

export default NewPostForm