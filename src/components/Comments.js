import React from "react";

const renderComments = comments =>
  comments.map(comment => (
    <li key={comment.id} className="collection-item avatar">
      <i className="material-icons circle">person</i>
      <strong className="title">{comment.fullName}</strong>
      <p>{comment.comment}</p>
      <div className="secondary-content">
        <i>{comment.date_created}</i>
      </div>
    </li>
  ));

const Comments = ({ items: comments }) => (
  <div className="row">
    <ul className="collection with-header">
      <li className="collection-header">
        <h4>Comments</h4>
      </li>
      {renderComments(comments)}
    </ul>
  </div>
);

export default Comments;
