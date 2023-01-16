import './RegisterStep.css';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import RegisterForm from '../RegisterForm/RegisterForm';
import AccountRequirements from '../AccountRequirements/AccountRequirements';
import CreateUserSuccess from '../CreateUserSuccess/CreateUserSuccess';

export default function RegisterStep({ triggerShake }) {
  const [showForm, setShowForm] = useState(true);
  const [showRequirements, setShowRequirements] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Displays register new user form on step
  const toggleForm = (event) => {
    event.preventDefault();
    setShowRequirements(false);
    setShowSuccess(false);
    setShowForm(true);
  };

  // Displays new user requirements on step
  const toggleRequirements = (event) => {
    event.preventDefault();
    setShowForm(false);
    setShowSuccess(false);
    setShowRequirements(true);
  };

  // Displays user created success message on step
  const toggleSuccess = (event) => {
    setShowForm(false);
    setShowRequirements(false);
    setShowSuccess(true);
  };

  return (
    <>
      <AnimatePresence intial={false} mode="wait">
        {showForm && (
          <RegisterForm
            toggleRequirements={toggleRequirements}
            toggleSuccess={toggleSuccess}
            triggerShake={triggerShake}
            key="register-form"
          />
        )}
        {showRequirements && (
          <AccountRequirements
            toggleRequirements={toggleForm}
            key="account-requirements"
          />
        )}
        {showSuccess && <CreateUserSuccess key="success" />}
      </AnimatePresence>
    </>
  );
}
