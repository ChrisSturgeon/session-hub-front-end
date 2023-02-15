import { APIURL } from '../../api';
import useFetch from '../../hooks/useFetch';

// Component imports
import Spinner from '../Spinner/Spinner';
import CommentCard from './CommentCard/CommentCard';
import NewCommentForm from './NewCommentForm/NewCommentForm';

export default function Comments({ sessionID }) {
  // const { sessionID } = useParams();
  const url = `${APIURL}/comments/${sessionID}`;

  const {
    isLoading,
    APIData: comments,
    setAPIData: setComments,
  } = useFetch(url);

  if (isLoading) {
    return <Spinner />;
  }

  if (comments.data) {
    return (
      <>
        <h3 style={{ color: 'var(--dark-blue' }}>Comments</h3>
        <NewCommentForm sessionID={sessionID} />

        {comments.data.map((comment) => {
          return <CommentCard key={comment._id} comment={comment} />;
        })}
      </>
    );
  }
}
