import { updateAdminCred } from "../types/types.auth";

const initialState:updateAdminCred = {
    username: "",
    phoneNumber: "",
    image: null,
  };
  
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, username: action.payload };
      case "SET_PHONE_NUMBER":
        return { ...state, phoneNumber: action.payload };
      case "SET_IMAGE":
        return { ...state, image: action.payload };
      default:
        return state;
    }
  };


  export { initialState, reducer };