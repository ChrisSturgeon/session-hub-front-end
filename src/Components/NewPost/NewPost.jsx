import './NewPost.css';
import Map from './Map/Map';
import NewPostForm from './NewPostForm/NewPostForm';

export default function NewPost() {
  return (
    <div className="new-post">
      <p>I'm the new post page</p>
      <NewPostForm />
    </div>
  );
}
