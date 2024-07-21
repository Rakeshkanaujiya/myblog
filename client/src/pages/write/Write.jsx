import React, { useState } from "react";
// import "./write.css";
import { useContext } from "react";
import Context from "../../context/Context";
import axios from "axios";
import { baseURL } from "../../baseurl";
import Footer from "../../components/footer/Footer";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState('')
  const {user} = useContext(Context)
  const handleSubmit = async (e) => {
    e.preventDefault();
      const newPost = {
        username: user.username,
        email: user.email,
        title,
        desc
      };

      if(file){
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          await axios.post(`${baseURL}/api/upload`, data);
        } catch (error) {
          
        }
      }
      try {
        const res = await axios.post(`${baseURL}/api/posts`, newPost);
        console.log(res.data);
        window.location.replace("/post/"+res.data._id);
      } catch (error) {
        console.log(error.response);
      }
  };
  return (
    <>
      <div className="w-full flex justify-center mt-10">
        <div className="write w-[80%]">
          <div className="writePostImg">
            {file && (
              <img
                className="writeImg w-full h-[350px] rounded-lg mb-8"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )}
          </div>

          <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
              <div className="flex justify-between mt-8 mb-10">
                <label
                  htmlFor="fileInput"
                  className="w-10 h-10 flex justify-center items-center text-white border-solid p-2 cursor-pointer rounded-full bg-gray-500"
                >
                  <i className="writeIcon text-2xl fa-solid fa-plus"></i>
                </label>
                <button
                  className="writeSubmit bg-indigo-600 text-white p-2 w-[80px] md:w-[100px] rounded-lg hover:bg-indigo-500"
                  type="submit"
                >
                  Publish
                </button>
              </div>
              <input
                type="file"
                name=""
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <input
                type="text"
                className="writeInput inputTitle w-full focus:outline-none text-3xl font-semibold text-gray-600"
                placeholder="Title"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                placeholder="Tell Your Story..."
                type="text"
                className="writeInput writetext w-full focus:outline-none text-2xl mt-5 mb-10 text-gray-600"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Write;
