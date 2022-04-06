import { createStore } from "redux";

const initialState = {
  email: "",
  password: "",
  isLogged: "",
  users: [],
  username: "",
  useremail: "",
  userphone: "",
  usergender: "Male",
  userpassword: "",
};
const crudReducer = (state = initialState, action) => {
  if (action.type === "email") {
    return {
      ...state,
      email: action.value,
    };
  }
  if (action.type === "password") {
    return {
      ...state,
      password: action.value,
    };
  }
  if (action.type === "logged") {
    return {
      ...state,
      isLogged: action.value,
    };
  }
  if (action.type === "users") {
    return {
      ...state,
      users: action.value,
    };
  }
  if (action.type === "name") {
    return {
      ...state,
      username: action.value,
    };
  }
  if (action.type === "addemail") {
    return {
      ...state,
      useremail: action.value,
    };
  }
  if (action.type === "addpassword") {
    return {
      ...state,
      userpassword: action.value,
    };
  }
  if (action.type === "phone") {
    return {
      ...state,
      userphone: action.value,
    };
  }
  if (action.type === "gender") {
    return {
      ...state,
      usergender: action.value,
    };
  }
  return state;
};
const crudStore = createStore(
  crudReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default crudStore;
