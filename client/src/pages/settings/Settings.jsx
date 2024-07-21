// import "./settings.css";
import { useContext, useState } from "react";
import Context from "../../context/Context";
import axios from "axios";
import { baseURL } from "../../baseurl";
import Footer from "../../components/footer/Footer";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = `${baseURL}/images/`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email:user.email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(`${baseURL}/api/upload`, data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(`${baseURL}/api/users/${user._id}`, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings w-[100%] flex justify-center">
      <div className="settingsWrapper w-[80%]">
        <div className="settingsTitle flex justify-between mt-5">
          <span className="settingsUpdateTitle text-2xl md:text-3xl text-indigo-500 font-semibold mb-5">
            Update Your Account
          </span>
          <span className="settingsDeleteTitle text-sm mt-2 md:text-lg font-semibold text-red-500 cursor-pointer">
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label className="text-purple-600 font-semibold">
            Profile Picture
          </label>
          <div className="settingsPP flex mt-5">
            {user.profilePic ? (
              <img
                className="settingsImg w-[150px] rounded-md"
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt=""
              />
            ) : (
              <img
                className="topImg w-20 h-20 rounded-full"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
            )}

            <div className="flex items-center ml-3">
              <label htmlFor="fileInput">
                <i className="settingsPPIcon flex justify-center items-center text-2xl text-gray-600 cursor-pointer rounded-full far fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <label>Username</label>
            <input
              className="md:w-[50%] w-[100%] text-2xl focus:outline-none border-b-2 mt-1 mb-5"
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              type="email"
              value={user.email}
              className="md:w-[50%] w-[100%] text-2xl focus:outline-none border-b-2 mt-1 mb-5 text-gray-600"
              readOnly
            />
            <label>Password</label>
            <input
              className="md:w-[50%] w-[100%] text-2xl focus:outline-none border-b-2 mt-1 mb-5"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-center md:w-[50%] w-[100%]">
              <button
                className="settingsSubmit bg-indigo-500 text-white p-2 w-[150px] rounded-lg hover:bg-indigo-700 mb-5"
                type="submit"
              >
                Update
              </button>
            </div>
            {success && (
              <span
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                Profile has been updated...
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
