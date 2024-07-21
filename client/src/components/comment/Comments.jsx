import React, { useState } from 'react'

export default function Comments() {
    const [comment, setComment] = useState('')
    const addComment = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(`http://localhost:5000/api/comment/post/${id}`, {
          comment,
        });
        if (data.success === true) {
          setComment("");
          //displaySinglePost();
          socket.emit("comment", data.post.comments);
        }
        //console.log("comment post", data.post)
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    };
  return (
    <div>
      <form action="" onClick={addComment}>
        Comment:
        <div>
          <textarea name="" id=""></textarea>
        </div>
        <button type="submit" onChange={(e) => setComment(e.target.value)}>
          Submit
        </button>
      </form>
    </div>
  );
}
