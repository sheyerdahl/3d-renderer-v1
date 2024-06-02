import { createContext } from "react";

const defaultContext: [number, () => any] = [1, () => {}]

export default createContext(defaultContext)