import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Spinner from '../Spinner/Spinner';
import CommentCard from './CommentCard/CommentCard';
import NewCommentForm from './NewCommentForm/NewCommentForm';

export default function Comments() {
  const { sessionID } = useParams();
  const url = `http://localhost:3000/api/sessions/${sessionID}/comments/all`;

  const { isLoading, APIData: data, error } = useFetch(url);

  if (isLoading) {
    return <Spinner />;
  }

  if (data.data) {
    return (
      <>
        <h3>Comments</h3>
        <NewCommentForm />

        {data.data.map((comment) => {
          return <CommentCard key={comment._id} comment={comment} />;
        })}
      </>
    );
  }
}
