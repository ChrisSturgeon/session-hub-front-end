import './SessionFormMobileNav.css';
import { NavLink } from 'react-router-dom';

export default function SessionFormMobileNav({ completed }) {
  return (
    <nav className="session-form-nav-mobile">
      <ul>
        <li>
          <NavLink to="about" className={completed.about ? 'active' : ''}>
            <span>
              <span>
                {completed.about ? (
                  <ion-icon name="checkmark-outline"></ion-icon>
                ) : (
                  '1'
                )}
              </span>
            </span>
          </NavLink>
        </li>
        <span
          className={completed.about ? 'vertical-line active' : 'vertical-line'}
        ></span>
        <li>
          <NavLink to="location" className={completed.location ? 'active' : ''}>
            <span>
              <span>
                {completed.location ? (
                  <ion-icon name="checkmark-outline"></ion-icon>
                ) : (
                  '2'
                )}
              </span>
            </span>
          </NavLink>
        </li>
        <span
          className={
            completed.location ? 'vertical-line active' : 'vertical-line'
          }
        ></span>
        <li>
          <NavLink
            to="conditions"
            className={completed.conditions ? 'active' : ''}
          >
            <span>
              <span>
                {completed.conditions ? (
                  <ion-icon name="checkmark-outline"></ion-icon>
                ) : (
                  '3'
                )}
              </span>
            </span>
          </NavLink>
        </li>
        <span
          className={
            completed.conditions ? 'vertical-line active' : 'vertical-line'
          }
        ></span>
        <li>
          <NavLink
            to="equipment"
            className={completed.equipment ? 'active' : ''}
          >
            <span>
              <span>
                {completed.equipment ? (
                  <ion-icon name="checkmark-outline"></ion-icon>
                ) : (
                  '4'
                )}
              </span>
            </span>
          </NavLink>
        </li>
        <span
          className={
            completed.equipment ? 'vertical-line active' : 'vertical-line'
          }
        ></span>
        <li>
          <NavLink to="wrap-up" className={completed.wrapUp ? 'active' : ''}>
            <span>
              <span>
                {completed.wrapUp ? (
                  <ion-icon name="checkmark-outline"></ion-icon>
                ) : (
                  '5'
                )}
              </span>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
