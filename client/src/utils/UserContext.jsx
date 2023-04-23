/*
    This code exports a `UserContext` object created using the `createContext` function provided by the React library. 
    It allows the context to be used by other components that import it, allowing sharing of state across components in a React application. 
    `createContext()` creates a new context object, and the resulting `UserContext` object can be used to define a 
    provider component which wraps around other components, allowing them to access the context data. 
    This context data can then be consumed by other components via the `useContext` hook.
*/
import { createContext } from "react";
export const UserContext = createContext();

export default UserContext;
