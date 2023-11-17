import React, { useState } from 'react';

let UserContext = React.createContext();

export default UserContext;


export const UserProvider = ({children})=>{

    let [userlist,setuserlist] = useState([])
    let[isUserloggedIn,setisUserloggedIn] = useState(false)
      

    return <UserContext.Provider value={{userlist,setuserlist,isUserloggedIn,setisUserloggedIn}}>
        {children}
    </UserContext.Provider>
}