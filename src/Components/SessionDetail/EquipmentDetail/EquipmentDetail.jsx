import './EquipmentDetail.css';
import { sanitize } from 'dompurify';

export default function EquipmentDetail({ sport, equipment }) {
  if (sport === 'surfing') {
    return (
      <div className="equipment-detail">
        <div>
          <div className="equipment-label">BOARD</div>
          <div>{equipment.board}</div>
        </div>
      </div>
    );
  }

  if (sport === 'windsurfing') {
    return (
      <div className="equipment-detail">
        <div>
          <div className="equipment-label">BOARD</div>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(equipment.board) }}
          ></div>
        </div>
        <div>
          <div className="equipment-label">SAIL</div>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(equipment.sail) }}
          ></div>
        </div>
      </div>
    );
  }

  if (sport === 'kitesurfing') {
    return (
      <div className="equipment-detail">
        <div>
          <div className="equipment-label">BOARD</div>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(equipment.board) }}
          ></div>
        </div>
        <div>
          <div className="equipment-label">KITE</div>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(equipment.kite) }}
          ></div>
        </div>
      </div>
    );
  }

  if (sport === 'wingsurfing') {
    return (
      <div className="equipment-detail">
        <div>
          <div className="equipment-label">BOARD</div>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(equipment.board) }}
          ></div>
        </div>
        <div>
          <div className="equipment-label">WING</div>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(equipment.wing) }}
          ></div>
        </div>
      </div>
    );
  }

  if (sport === 'paddleboarding') {
    return (
      <div className="equipment-detail">
        <div>
          <div className="equipment-label">BOARD</div>
          <div
            dangerouslySetInnerHTML={{ __html: sanitize(equipment.board) }}
          ></div>
        </div>
      </div>
    );
  }
}
