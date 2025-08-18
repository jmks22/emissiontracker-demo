import React from 'react';
import {
  IonModal,
  IonButton,
  IonIcon
} from '@ionic/react';
import { addOutline, close } from 'ionicons/icons';
import '../../theme/general.scss';
import './AddFleetModal.scss';

interface AddFleetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFleetModal: React.FC<AddFleetModalProps> = ({ isOpen, onClose }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="compact-modal">
      <div className="modal-content create-modal">
        <span className="close-icon" onClick={onClose}>&times;</span>
        <h2>Add Fleet</h2>
        <label>Fleet ID</label>
        <input type="text" placeholder="Enter fleet id" />
        <label>Fleet Name</label>
        <input type="text" placeholder="Enter fleet name" />
        <div className="form-buttons">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="add-button">
            <IonIcon icon={addOutline} />
            Add
          </button>
        </div>
      </div>
    </IonModal>
  );
};

export default AddFleetModal;
