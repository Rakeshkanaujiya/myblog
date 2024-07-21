import { useEffect, useReducer } from "react";
import Context from "./Context";
import { INITIAL_STATE } from "./Context";
import Reducer from "./Reducer";


const ContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(()=>{
      localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
    return (
      <Context.Provider
        value={{
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch
        }}
      >
        {children}
      </Context.Provider>
    );
}

export default ContextProvider;