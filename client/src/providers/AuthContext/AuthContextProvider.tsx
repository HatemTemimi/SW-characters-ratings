import React, { createContext, useReducer, useEffect, ReactChildren } from 'react'
import { AuthAction, AuthReducerState, Props, authReducerType } from 'types/reducer';
import { UserSession } from 'types/user';

type Context = {
  dispatch: React.Dispatch<AuthAction>
  user: UserSession;
}

export const AuthContext = createContext<Context | undefined>(undefined)

export const authReducer = (state: AuthReducerState, action: AuthAction) => {
  const { type, payload } = action;
  switch (type) {
    case authReducerType.LOGIN:
      return { user: payload }
    case authReducerType.LOGOUT:
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user =  JSON.parse(String(localStorage.getItem('user')))
    if (user!==null) {
      dispatch({ type: authReducerType.LOGIN, payload: user })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { props.children }
    </AuthContext.Provider>
  )
}

