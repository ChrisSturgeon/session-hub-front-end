import Button from '../../Button/Button';
import './RegisterForm.css';
export default function RegisterForm() {
  const onSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className="register-form">
      <label>Username</label>
      <input type="text"></input>
      {/* <div>Please enter a valid username</div> */}
      <label>Password</label>
      <input type="password"></input>
      <label>Repeat Password</label>
      <input type="password"></input>
      {/* <div>Passwords do not match</div> */}
      <Button label="Create Account"></Button>
    </form>
  );
}
