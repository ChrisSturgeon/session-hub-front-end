import './EquipmentDetail.css';

export default function EquipmentDetail({ sport, equipment }) {
  if (sport === 'surfing') {
    return (
      <div className="equipment-detail">
        <span>
          <strong>Board</strong>: {equipment.board}
        </span>
      </div>
    );
  }

  if (sport === 'windsurfing') {
    return (
      <div className="equipment-detail">
        <span>
          <strong>Board</strong>: {equipment.board}
        </span>
        <span>
          <strong>Sail</strong>: {equipment.sail}
        </span>
      </div>
    );
  }

  if (sport === 'kitesurfing') {
    return (
      <div className="equipment-detail">
        <span>
          <strong>Board</strong>: {equipment.board}
        </span>
        <span>
          <strong>Kite</strong>: {equipment.kite}
        </span>
      </div>
    );
  }

  if (sport === 'wingsurfing') {
    return (
      <div className="equipment-detail">
        <span>
          <strong>Board</strong>: {equipment.board}
        </span>
        <span>
          <strong>Wing</strong>: {equipment.wing}
        </span>
      </div>
    );
  }

  if (sport === 'paddleboarding') {
    return (
      <div className="equipment-detail">
        <span>
          <strong>Board</strong>: {equipment.board}
        </span>
      </div>
    );
  }
}
