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
      <label>Password</label>
      <input type="password"></input>
      <label>Repeat Password</label>
      <input type="password"></input>
      <Button label="Create Account"></Button>
    </form>
  );
}
