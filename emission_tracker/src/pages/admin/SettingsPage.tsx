import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonIcon,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import '../../theme/general.scss';
import './SettingsPage.scss';
import { useState } from 'react';
import Header from '../../components/general/Header';

const SettingsPage: React.FC = () => {
  const [dateFrom, setDateFrom] = useState('2025-04-01');
  const [dateTo, setDateTo] = useState('2025-04-30');
  const [sessionTimeout, setSessionTimeout] = useState('30 Minutes');
  const [backupFrequency, setBackupFrequency] = useState('Daily');
  const [backupType, setBackupType] = useState('Incremental');
  const [retentionPeriod, setRetentionPeriod] = useState('90 days');

  return (
    <IonPage>
      <IonHeader>
            <Header></Header>
            <IonToolbar className="welcome">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/admin/dashboard" text="Dashboard"/>
                    <h1>Settings</h1>
                    
                </IonButtons>
            </IonToolbar>
        </IonHeader>

      <IonContent className="ion-padding">
        <div className="settings-container">
          {/* Left Column */}
          <div className="left-column">
            <div className="card backup-card">
              <h3>Backups</h3>
              <div className="backup-row">
                <div className="backup-item">
                  <span>Backup Frequency:</span>
                  <IonSelect
                    value={backupFrequency}
                    onIonChange={(e) => setBackupFrequency(e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="Daily">Daily</IonSelectOption>
                    <IonSelectOption value="Weekly">Weekly</IonSelectOption>
                    <IonSelectOption value="Monthly">Monthly</IonSelectOption>
                  </IonSelect>
                </div>

                <div className="backup-item">
                  <span>Backup Type:</span>
                  <IonSelect
                    value={backupType}
                    onIonChange={(e) => setBackupType(e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="Incremental">Incremental</IonSelectOption>
                    <IonSelectOption value="Full">Full</IonSelectOption>
                  </IonSelect>
                </div>

                <div className="backup-item">
                  <span>Storage Location:</span>
                  <span className="bold-text">https://s3.amazonaws.com/my-bucket</span>
                </div>

                <div className="backup-item">
                  <span>Retention Period:</span>
                  <IonSelect
                    value={retentionPeriod}
                    onIonChange={(e) => setRetentionPeriod(e.detail.value)}
                    interface="popover"
                  >
                    <IonSelectOption value="30 days">30 days</IonSelectOption>
                    <IonSelectOption value="90 days">90 days</IonSelectOption>
                    <IonSelectOption value="180 days">180 days</IonSelectOption>
                  </IonSelect>
                </div>
              </div>
            </div>

            <div className="card">
              <h3>System Logs</h3>
              <div className="log-filter">
                <label>Filter:</label>
                <span>Date From</span>
                <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                <span>to</span>
                <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
              </div>
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>User</th>
                    <th>Action</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10:12 AM</td>
                    <td>Transport Manager</td>
                    <td>Login</td>
                    <td>Success</td>
                  </tr>
                  <tr>
                    <td>9:58 AM</td>
                    <td>Administrator</td>
                    <td>Backup</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>9:00 AM</td>
                    <td>Transport Manager</td>
                    <td>Report generation</td>
                    <td>Fleet ‘VerdaMove’ emissions data - CSV</td>
                  </tr>
                </tbody>
              </table>
              <div className="pagination">
                <button>{'<'} Back</button>
                <span>1 2 3 4 5 ... 99</span>
                <button>Next {'>'}</button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column card">
            <h3>Security</h3>
            <p><strong>Password Policy:</strong></p>
            <p><span>Minimum Length:</span> 12 Characters</p>

            <p>
  <span>Require Special Chars:</span>
  <label>
    <IonCheckbox checked slot="start" />
    Yes
  </label>
  <label>
    <IonCheckbox slot="start" />
    No
  </label>
</p>


            <p><span>Expire After:</span> 180 Days</p>

            <p>
              <span>Multi-Factor Auth (MFA):</span>
              <IonCheckbox />
              <label>Disabled</label>
              <IonCheckbox />
              <label>Optional</label>
              <IonCheckbox checked />
              <label>Required</label>
            </p>

            <p>
              <span>Session Timeout:</span>
              <IonSelect
                value={sessionTimeout}
                onIonChange={(e) => setSessionTimeout(e.detail.value)}
                interface="popover"
              >
                <IonSelectOption value="15 Minutes">15 Minutes</IonSelectOption>
                <IonSelectOption value="30 Minutes">30 Minutes</IonSelectOption>
                <IonSelectOption value="1 Hour">1 Hour</IonSelectOption>
                <IonSelectOption value="2 Hours">2 Hours</IonSelectOption>
              </IonSelect>
            </p>

            <p><strong>Encryption:</strong></p>
            <p><span>Data at Rest:</span> aes-256</p>
            <p><span>Data in Transit:</span> TLS 1.2+</p>

            <div className="form-buttons">
              <IonButton >Undo</IonButton>
              <IonButton color="dark">Save</IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
