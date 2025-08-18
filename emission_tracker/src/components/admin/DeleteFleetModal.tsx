import React from 'react';
import { IonModal, IonIcon } from '@ionic/react';
import { closeOutline, closeCircleOutline } from 'ionicons/icons';
import '../../theme/general.scss';
import './DeleteFleetModal.scss';

interface DeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteFleetModal: React.FC<DeleteModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onCancel} className="delete-modal">
      <div className="modal-box">
        <div className="modal-header">
          <h2>Remove Fleet</h2>
          <IonIcon icon={closeOutline} className="modal-close" onClick={onCancel} />
        </div>

        <p className="modal-message">Are you sure you want to remove the fleet?</p>

        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancel}>Cancel</button>
          <button className="delete-button" onClick={onConfirm}>
            <IonIcon icon={closeCircleOutline} className="delete-icon" />
            Delete
          </button>
        </div>
      </div>
    </IonModal>
  );
};

export default DeleteFleetModal;
