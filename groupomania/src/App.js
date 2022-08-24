import React, {useEffect, useState} from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios"

const App = ()=> {
  const[uid, setUid] = useState(null);
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
  }, [uid])

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  )
}

export default App;