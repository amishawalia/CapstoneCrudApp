import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import userservice from "../../services/userservice";

const EditUser = () => {

    let user;
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state);
  const { username, useremail, userphone, usergender, userpassword } =
    useSelector((state) => state);

  const submitHandler = e => {

    e.preventDefault();
    const editedUser = {
      fullname: username,
      email: useremail,
      gender: usergender,
      phone: userphone,
      password: userpassword,
    };
    console.log('edit',editedUser);
    userservice.updateUser(params.id,editedUser).then(res => {
        if (res.status == 200) {
            navigate('/list');
        }
    })
  };

  useEffect(() => {
        function findUser(id) {
            let checkUser = users.find(user => user?._id === id);
            if (!checkUser) {
                checkUser = JSON.parse(localStorage.getItem('user'));
            }
            dispatch({ type: "name", value: checkUser.fullname})
            dispatch({ type: "addemail", value: checkUser.email})
            dispatch({ type: "phone", value: checkUser.phone})
            dispatch({ type: "gender", value: checkUser.gender})
            return checkUser
        }
            
        user = findUser(params.id);
        localStorage.setItem('user',JSON.stringify(user));
        
    },[users]);
    
  return (
    <>
      <div className="container m-2">
        <h3>Edit user</h3>
        <form onSubmit={submitHandler}>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={username}
              className="form-control"
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
                checked={usergender.toUpperCase() === "MALE"}
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
                checked={usergender.toUpperCase() === "FEMALE"}
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
                checked={usergender.toUpperCase() === "OTHERS"}
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
            <input type="submit" value="Edit User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </>
  );
};
export default EditUser;
