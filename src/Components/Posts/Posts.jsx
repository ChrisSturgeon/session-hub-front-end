import './Posts.css';
import { useLoaderData } from 'react-router-dom';
import SessionCard from '../SessionCard/SessionCard';

export default function Posts() {
  const { overviews } = useLoaderData();

  if (overviews.length === 0) {
    return (
      <div className="overviews-wrapper">
        This user hasn't posted any sessions yet!
      </div>
    );
  }

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
