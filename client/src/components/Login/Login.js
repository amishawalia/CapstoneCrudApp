import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userservice from "../../services/userservice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, isLogged } = useSelector((state) => state);
  const emailHandler = (e) => {
    dispatch({ type: "email", value: e.target.value });
  };
  const passwordHandler = (e) => {
    dispatch({ type: "password", value: e.target.value });
  };
  const loginHandler = (e) => {
    e.preventDefault();
    userservice.loginUser({ email: email, password: password }).then((res) => {
      console.log(res);
      if (Object.keys(res?.data).length) {
        localStorage.setItem("token", res.data.token);
        dispatch({ type: "logged", value: true });
        navigate("/list");
      } else {
        console.log("data empty");
        dispatch({ type: "logged", value: false });
      }
    });
  };
  useEffect(() => {
    const localData = localStorage.getItem("token");
    if (localData) {
      navigate("/list");
    }
  }, []);
  return (
    <>
      <div className="container mt-3">
        {isLogged === false ? (
          <div className="alert alert-danger">
            <strong>Error:</strong>Login Credentials failed
          </div>
        ) : (
          ""
        )}
        <form onSubmit={loginHandler}>
          <div className="mb-3 mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="enter email"
              onChange={emailHandler}
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="password">Email</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="enter password"
              onChange={passwordHandler}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
