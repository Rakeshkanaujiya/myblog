import React from "react";

export const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching:false,
    error:false
}

const Context = React.createContext(INITIAL_STATE);
export default  Context;