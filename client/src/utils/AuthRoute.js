// import React,{useContext} from "react";


// import { Route,Navigate } from "react-router-dom";

// import { AuthContext } from "../context/auth";

// // function AuthRoute({component:Component,...rest}){
// //     const {user}=useContext(AuthContext);

// //     return(
       
// //         <Route {...rest}
// //             render={(props)=>
// //                 user?<Route path="/"/>:<Component {...props} />
// //                 }
// //          />
        
        
       
// //     )
// // }

// const AuthRoute =({component:Component,...rest}) =>{
//     const user=useContext(AuthContext);

//     return (
//         <Route 
//             {...rest}
//                 element={(props)=>
//                 user?<Navigate to="/"/>:<Component {...props} />
//             }

//         />


    
//     )

// }

// export default AuthRoute;

import React, { useContext } from 'react'
import { Route,Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";



export default function AuthRoute({component:Component,...rest}) {
    const user=useContext(AuthContext);


  return (
            <Route 
            {...rest}
                element={(props)=>
                user?<Navigate to="/"/>:<Component {...props} />
            }

        />
  )
}

