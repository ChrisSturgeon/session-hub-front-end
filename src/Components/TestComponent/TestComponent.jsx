import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';

export default function TestComponent() {
  const { isLoading, isAuthenticated, APIData, error } = useFetch(
    'http://localhost:3000/api/users/protected'
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return (
      <div>You must be logged in to view this page. Please login here</div>
    );
  }

  if (APIData) {
    return <div>{APIData.message}</div>;
  }
}
