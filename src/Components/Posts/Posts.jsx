import './Posts.css';
import { useLoaderData } from 'react-router-dom';
import SessionCard from '../SessionCard/SessionCard';

export default function Posts() {
  const { overviews } = useLoaderData();

  return (
    <div className="overviews-wrapper">
      <div className="overviews-column">
        {overviews && (
          <>
            {overviews.map((session) => {
              return <SessionCard key={session._id} session={session} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}
