import { UserSession } from "./user";

export enum authReducerType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface AuthAction {
  type: authReducerType;
  payload: UserSession;
}

export interface AuthReducerState {
  user: UserSession | null

}

export interface Props {
  children: React.ReactNode;
}

