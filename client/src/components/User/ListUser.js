import userservice from "../../services/userservice"
import { useEffect} from "react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ListUser = ( ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {users} = useSelector(state =>state); 

    const deleteUser = (id) => {
        userservice.deleteUser(id).then(res => {
            navigate('/list')
        })
    }

    useEffect(() => {
        userservice.getUser().then(res => {
            console.log(res.data);
            dispatch({type: 'users',value: res.data})
        }).catch(err => {
            console.log('error in list' + err);
        })
    }, []);

    console.log(users);

    return <>
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone no</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return <tr key={user._id}>
                                <td>{user.fullname}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <Link to={`/edit/${user._id}`} className="btn btn-warning m-1">Edit</Link>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                                </td>
                            </tr>
                    })}
                </tbody>
            </table>
        </div>
    </>
}
export default ListUser
