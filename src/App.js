import React, { createContext,useContext, useEffect, useState } from "react";

const Context = createContext()
function App() {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true
  });

  const data = {
    userState,
    setUserState
}

return(
  <Context.Provider value={data} >
     <UserList />
  </Context.Provider>
)
}

const UserList = () => {
  const { userState,setUserState } = useContext(Context)

  useEffect(() => {
    const intervalRandom = setInterval(() => {
      setUserState((pre) => {
        const user = Object.keys(pre) 
        const random = Math.floor(Math.random() * user.length)
        const randomUser = user[random] // userKeys[randomuser] ifadesi, userKeys dizisinin randomuser indeksindeki elemanına karşılık gelen kullanıcı adını döndürür. 
        return {
          ...pre,
          [randomUser]: !pre[randomUser]
        }
      })
    }, 2000)
    return () => clearInterval(intervalRandom)
  },[])

  return(
    <div style={{textAlign:"center",marginTop:"50px",fontSize:"90px"}}>
       {Object.entries(userState).map(([user,value],index) => (
         <div key={index}>
          <section> {user} {value ? "🟢" : "🔴"}</section>
         </div>

       ))}
    </div>
  )
}

export default App;

// useEffect(() => {
//   const intervalId = setInterval(() => {
//     setUserState(prevState => {
//       const randomUser = Object.keys(prevState)[Math.floor(Math.random() * Object.keys(prevState).length)]
//       return {
//         ...prevState,
//         [randomUser]: !prevState[randomUser]
//       }
//     })
//   }, 2000)

//   return () => clearInterval(intervalId);
// }, [])