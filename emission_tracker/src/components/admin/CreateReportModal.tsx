import React, { useState } from 'react';
import { IonModal, IonIcon } from '@ionic/react';
import { closeOutline, addOutline, checkmarkOutline } from 'ionicons/icons';
import '../../theme/general.scss';
import './CreateReportModal.scss';

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

const CreateReportModal: React.FC<CreateReportModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [fileType, setFileType] = useState<'CSV' | 'XLSX'>('CSV');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="create-report-modal">
      <div className="report-modal-box">
        <div className="modal-header">
          <h2>Create Emissions Report</h2>
          <IonIcon icon={closeOutline} className="close-icon" onClick={onClose} />
        </div>

        <label>Fleet Selection</label>
        <select className="modal-input">
          <option>All</option>
          <option>VerdaMove</option>
          <option>Fleet A</option>
          <option>Fleet B</option>
        </select>

        <label>Date Range</label>
        <div className="date-range">
          <input
            className="modal-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>to</span>
          <input
            className="modal-input"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <label>File Type</label>
        <div className="file-type-options">
          {['CSV', 'XLSX'].map((type) => (
            <div
              key={type}
              className={`file-option ${fileType === type ? 'selected' : ''}`}
              onClick={() => setFileType(type as 'CSV' | 'XLSX')}
            >
              <span>{type}</span>
              {fileType === type && <IonIcon icon={checkmarkOutline} />}
            </div>
          ))}
        </div>

        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="create-button" onClick={onCreate}>
            <IonIcon icon={addOutline} />
            Create
          </button>
        </div>
      </div>
    </IonModal>
  );
};

export default CreateReportModal;
