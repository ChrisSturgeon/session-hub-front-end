import './EquipmentEdit.css';
import { useOutletContext } from 'react-router-dom';
import InputWithCounter from '../../General/InputWithCounter/InputWithCounter';

export default function EquipmentEdit() {
  const [sessionState, setSessionState] = useOutletContext();
  const { sport } = sessionState.about;
  const { equipment } = sessionState;

  function handleEquipmentChange(event) {
    setSessionState({
      ...sessionState,
      equipment: {
        ...sessionState.equipment,
        [event.target.name]: event.target.value,
      },
    });
  }

  return (
    <div className="equipment">
      <h3>Editing Equipment</h3>
      <div className="inputs">
        {sport === 'surfing' && (
          <div key="surfing">
            <label htmlFor="board">Board</label>
            <InputWithCounter
              id={'board'}
              value={equipment.board}
              onChange={handleEquipmentChange}
              placeholder={"e.g. Maluku Quad Fish 6'2"}
              name={'board'}
              maxLength={40}
            />
          </div>
        )}
        {sport === 'windsurfing' && (
          <div key="windsurfing">
            <label htmlFor="board">Board</label>
            <InputWithCounter
              id={'board'}
              value={equipment.board}
              onChange={handleEquipmentChange}
              placeholder={'e.g. JP Freestyle 93'}
              name={'board'}
              maxLength={40}
            />
            <label htmlFor="sail">Sail</label>
            <InputWithCounter
              id={'sail'}
              value={equipment.sail}
              onChange={handleEquipmentChange}
              placeholder={'e.g. Neilpryde Wizard 5.4m'}
              name={'sail'}
              maxLength={40}
            />
          </div>
        )}
        {sport === 'kitesurfing' && (
          <div key="kitesurfing">
            <label htmlFor="board">Board</label>
            <InputWithCounter
              id={'board'}
              value={equipment.board}
              onChange={handleEquipmentChange}
              placeholder={'e.g. Duotone Gambler 142cm'}
              name={'board'}
              maxLength={40}
            />
            <label htmlFor="board">Kite</label>
            <InputWithCounter
              id={'kite'}
              value={equipment.kite}
              onChange={handleEquipmentChange}
              placeholder={'e.g. Dice SLS 12m'}
              name={'kite'}
              maxLength={40}
            />
          </div>
        )}
        {sport === 'wingsurfing' && (
          <div key="wingsurfing">
            <label htmlFor="board">Board</label>
            <InputWithCounter
              id={'board'}
              value={equipment.board}
              onChange={handleEquipmentChange}
              placeholder={"e.g. F-One Rocket Surf 4'6"}
              name={'board'}
              maxLength={40}
            />
            <label htmlFor="board">Wing</label>
            <InputWithCounter
              id={'wing'}
              value={equipment.wing}
              onChange={handleEquipmentChange}
              placeholder={'e.g. North Nova 2.5m'}
              name={'wing'}
              maxLength={40}
            />
          </div>
        )}
        {sport === 'paddleboarding' && (
          <div key="paddleboarding">
            <label htmlFor="board">Board</label>
            <InputWithCounter
              id={'board'}
              value={equipment.board}
              onChange={handleEquipmentChange}
              placeholder={"e.g. Fantic Fly 10'4"}
              name={'board'}
              maxLength={40}
            />
          </div>
        )}
      </div>
    </div>
  );
}
