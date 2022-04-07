import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userservice from "../../services/userservice";
const CreateUser = () => {
  const { username, useremail, userphone, usergender, userpassword } =
    useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      fullname: username,
      email: useremail,
      gender: usergender,
      phone: userphone,
      password: userpassword,
    };
    userservice.createUser(newUser).then((res) => {
      if (res.status === 200) {
        navigate("/list");
      }
    });
  };
  useEffect(() => {

    dispatch({ type: "name", value: ''})
    dispatch({ type: "addemail", value: ''})
    dispatch({ type: "phone", value: ''})
    dispatch({ type: "gender", value: 'Male'})

  }, [])
  return (
    <>
      <div className="container m-2">
        <h3>Create a new user</h3>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="enter fullname"
              className="form-control"
              value={username}
              onChange={(e) =>
                dispatch({ type: "name", value: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="enter email"
              className="form-control"
              value={useremail}
              onChange={(e) =>
                dispatch({ type: "addemail", value: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter password"
              className="form-control"
              value={userpassword}
              onChange={(e) =>
                dispatch({ type: "addpassword", value: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone No</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="enter phone no"
              className="form-control"
              value={userphone}
              onChange={(e) =>
                dispatch({ type: "phone", value: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                id="gender"
                className="form-check-input"
                value="Male"
                checked={usergender === "Male"}
                onChange={(e) =>
                  dispatch({ type: "gender", value: e.target.value })
                }
              />
              <label htmlFor="gender" className="form-check-lable">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                id="gender"
                className="form-check-input"
                value="Female"
                checked={usergender === "Female"}
                onChange={(e) =>
                  dispatch({ type: "gender", value: e.target.value })
                }
              />
              <label htmlFor="gender" className="form-check-lable">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="gender"
                id="gender"
                className="form-check-input"
                value="Others"
                checked={usergender === "Others"}
                onChange={(e) =>
                  dispatch({ type: "gender", value: e.target.value })
                }
              />
              <label htmlFor="gender" className="form-check-lable">
                Others
              </label>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Add User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateUser;
