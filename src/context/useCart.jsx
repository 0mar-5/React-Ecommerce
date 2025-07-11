import { useContext } from "react";
import { CartContext } from "./Context";

export const useCart = () => useContext(CartContext);
