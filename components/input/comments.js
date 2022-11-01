import { useEffect, useState } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";

import classes from "./comments.module.css";
const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  //   console.log(showComments);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      // fetch data
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => setComments(data.comments));
    }
  }, [showComments, eventId]);

  const toggleCommentHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
