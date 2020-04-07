import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    title: "",
    contents: ""
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios
    .get("http://localhost:5000/api/posts")
    .then((res) => {
      setPosts(res.data);
    })
    .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {}, [posts]);

  const addPost = () => {
    axios
    .post("http://localhost:5000/api/posts", post)
    .then((res) => {
      console.log(res);
      setPosts(res.data);
      setPost({
        title: "",
        contents: "",
      });
      setPost();
    })
    .catch((err) => console.log(err.message));
  };

  const deletePost = (id) => {
    axios
    .delete(`http://localhost:5000/api/posts/${id}`)
    .then((res) => {
      setPosts(res.data);
    })
    .catch((err) => console.log(err.message));
  };

  const updatePost = (id) => {
    axios
    .put(`http://localhost:5000/api/posts/${id}`, post)
    .then((res) => {
      setPosts(res.data);
    })
    .catch((err) => console.log(err.message))
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updatePost();
  }

const handleAdd = (e) => {
  e.preventDefault();
  addPost();
}

const handleChange = (e) => {
  setPost({
    ...post,
    [e.target.name]: e.target.value,
  });
};

const editPost = (post) => {
  setPost(post);
  setEditing(true);
}

  return (
    <div className="App" >
      <h1>Current Posts</h1>
      <div style={{display: "flex",  flexWrap: "wrap", marginLeft: "1%"}}>
      {posts.map((post) => (
        <div key={post.id} style={{width: "446px", border: "1px solid black", background: 'whitesmoke'}}>
          <h4 onClick={()=> editPost(post)} key={post.title}>{post.title}</h4>
          <p key={post.contents}>CONTENT: {post.contents}</p>
          <button type="submit" style={{background: "red", color: "white"}} onClick={() => deletePost(post.id)}>DELETE</button>
        </div>
      ))}
      {!editing ? (

      <form onSubmit={handleAdd} style={{display: "flex", justifyContent:"center"}}>
        <h2>Add a post</h2>
        <div>
          <label style={{marginLeft:"1%", fontSize:"1.3rem"}}>Title:</label>
          <input
            id= "title"
            value={post.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{marginLeft:"1%", fontSize:"1.3rem"}}>Content:</label>
          <input
            id= "contents"
            value={posts.contents}
            name="contents"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add a post</button>
      </form> ) : (
        <form onSubmit={handleUpdate} style={{display: "flex", justifyContent:"center"}}>
          <h2>Update</h2>
          <div>
            <label style={{marginLeft:"1%", fontSize:"1.3rem"}}>Title:</label>
            <input
              id= "title"
              value={post.title}
              name="title"
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{marginLeft:"1%", fontSize:"1.3rem"}}>Content:</label>
            <input
              id= "contents"
              value={posts.contents}
              name="contents"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      )}
    </div> 
      </div>
  );
}

export default App;
