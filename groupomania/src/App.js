import React, {useEffect, useState} from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios"
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = ()=> {
  const[uid, setUid] = useState(null);
  const dispatch = useDispatch();

//recupérer le id pour vérifier l'utilisateur 
  useEffect( () => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/jwtid`,
        withCredentials:true,
      })
      .then((res) => 
      {
        setUid(res.data)
      })
      .catch((err) => console.log("No Token"))
    }
    fetchToken();

    if(uid) dispatch(getUser(uid))
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

export default App;