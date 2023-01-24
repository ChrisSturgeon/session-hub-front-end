import './Posts.css';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SessionCard from '../SessionCard/SessionCard';

export default function Posts() {
  const { overviews } = useLoaderData();

  useEffect(() => {
    console.log(overviews);
  }, [overviews]);

  return (
    <div className="overviews-column">
      {overviews && (
        <>
          {overviews.map((session) => {
            return <SessionCard key={session._id} session={session} />;
          })}
        </>
      )}
    </div>
  );
}
