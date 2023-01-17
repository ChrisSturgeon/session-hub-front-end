import './Request.css';

export default function Request({ requestData, decrementRequests }) {
  const responseURL = `http://localhost:3000/api/friends/request/${requestData._id}/response`;

  const handleSubmit = (reply) => (event) => {
    event.preventDefault();
    console.log(reply);

    // Define response function
    const giveReply = async (reply) => {
      try {
        const response = await fetch(responseURL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${window.localStorage.getItem('JWT')}`,
          },
          body: JSON.stringify({
            accepted: reply.toString(),
          }),
        });

        if (response.status === 200) {
          console.log('Response successfully submitted!');
          decrementRequests();
        }

        if (response.status === 404) {
          console.log('The user who sent this request no longer exists');
        }

        if (response.status === 400) {
          console.log('Something has gone wrong...');
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Invoke with response
    giveReply(reply);
  };

  return (
    <div>
      <div>I'm a friend request from {requestData.requester.name}</div>
      <form onSubmit={handleSubmit(true)}>
        <button>Accept</button>
      </form>
      <form onSubmit={handleSubmit(false)}>
        <button>Decline</button>
      </form>
    </div>
  );
}
