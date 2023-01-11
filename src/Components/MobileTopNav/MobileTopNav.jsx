import './MobileTopNav.css';

export default function MobileTopNav({ logOut }) {
  return (
    <div className="mobile-top-nav">
      <h1>Session Hub</h1>
      <button onClick={logOut}>
        <ion-icon name="log-out-outline"></ion-icon>
      </button>
    </div>
  );
}
