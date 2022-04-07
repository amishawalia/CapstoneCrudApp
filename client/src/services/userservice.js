import axios from "axios";
const baseUrl = "http://localhost:3000/user";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Token " + localStorage.getItem("token"),
};

class UserService {
  loginUser(credentials) {
    return axios.post(baseUrl + "/login", credentials);
  }
  getUser() {
    console.log(headers);
    return axios.get(baseUrl + "/list", { headers: headers });
  }
  createUser(data) {
    return axios.post(baseUrl + "/create", data, { headers: headers });
  }
  deleteUser(id) {
      return axios.delete(baseUrl + '/delete/' + id,{headers:headers});
  }
  updateUser(id,data) {
    return axios.put(baseUrl + '/update/' + id, data, {headers:headers});
  }
}
export default new UserService();
