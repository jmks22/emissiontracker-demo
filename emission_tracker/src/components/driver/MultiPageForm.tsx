import React, { useState, useRef } from 'react';
import './MultiPageForm.css';
import {
  IonButtons, IonButton, IonModal, IonHeader,
  IonContent, IonToolbar, IonTitle, IonFooter,
  IonLabel, IonIcon,
  IonChip,
  IonInput,
  IonItem,
  IonList,
  IonText
} from '@ionic/react';
import { close } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';
import Input from '../general/Input';
import Select from '../general/Select';
import TruckEnginePopup from './TruckEnginePopup';
import '../../theme/general.scss';

interface MultiPageFormProps {
  triggerButtonText?: string;
  triggerButtonStyle?: {
    fill?: 'clear' | 'outline' | 'solid';
    color?: string;
    size?: 'small' | 'default' | 'large';
    expand?: 'block' | 'full';
  };
  modalTitle?: string;
  onSave?: () => void;
}

const MultiPageForm: React.FC<MultiPageFormProps> = ({
  triggerButtonText = 'Prepare',
  triggerButtonStyle = {
    fill: 'solid',
    size: 'default',
    expand: 'block'
  },
  modalTitle = 'Confirm Details',
  onSave
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [step, setStep] = useState(1);

  const next = () => setStep(s => Math.min(s + 1, 4));
  const back = () => setStep(s => Math.max(s - 1, 1));
  const reset = () => setStep(1);

  const onWillDismiss = (event: CustomEvent<OverlayEventDetail>) => reset();

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    modal.current?.dismiss();
  };

/*

Form Components:
1. Trip Details 
2. Transit Details
3. Truck Details
4. Tracker

*/

  const titles = ['Trip', 'Transits', 'Truck', 'Tracker'];

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Trip />;
      case 2: return <Step2Transits />;
      case 3: return <Step3Truck />;
      case 4: return <Step4Tracker />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <IonButton 
        id="open-modal" 
        onClick={() => modal.current?.present()}
        fill={triggerButtonStyle.fill}
        color={triggerButtonStyle.color}
        size={triggerButtonStyle.size}
        expand={triggerButtonStyle.expand}
      >
        {triggerButtonText}
      </IonButton>

      <IonModal ref={modal} onWillDismiss={onWillDismiss}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{modalTitle}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => modal.current?.dismiss()}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <StepIndicator currentStep={step} steps={titles} />
          {renderStep()}
        </IonContent>

        <IonFooter className="no-shadow">
          <IonToolbar>
            <div className="footer-buttons">
              <IonButtons slot="start">
                <IonButton fill="outline" disabled={step === 1} onClick={back}>Back</IonButton>
              </IonButtons>
              <IonButtons slot="end">
                {step < 4 ? (
                  <IonButton fill="solid" strong onClick={next}>Next</IonButton>
                ) : (
                  <IonButton 
                    fill="solid" 
                    strong 
                    routerLink="/driver/timer"
                    onClick={handleSave}
                  >
                    Save
                  </IonButton>
                )}
              </IonButtons>
            </div>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    </div>
  );
};

//---------------------------- Step 1: Trip Details ---------------------------------
const FUEL_TYPES = [
  'Diesel',
  'Biodiesel',
  'Ethanol',
  'Gasoline',
  'Propane',
];

const Step1Trip: React.FC = () => {
  const [formData, setFormData] = useState({
    startLocation: 'Melbourne CBD',
    startDate: '2024-01-01',
    loadWeight: 10000,
    fuelType: 'Diesel'
  });

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.detail.value
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input 
        label="Starting Location" 
        placeholder="e.g., Delivery to Chicago" 
        type="text" 
        value={formData.startLocation}
        onChange={handleChange('startLocation')}
      />
      <Input 
        label="Start Date" 
        placeholder="13/02/2017" 
        type="date" 
        value={formData.startDate}
        onChange={handleChange('startDate')}
      />
      <Input 
        label="Load Weight (kg)" 
        placeholder="12000" 
        type="number" 
        minValue={0}
        value={formData.loadWeight}
        onChange={handleChange('loadWeight')}
      />
      <Select 
        label="Fuel Type"
        placeholder="Select fuel type"
        value={formData.fuelType}
        onChange={handleChange('fuelType')}
        options={FUEL_TYPES}
        header="Select Fuel Type"
      />
    </div>
  );
};

const dropoffLocations = [
  { title: '123 Main St, Springfield' },
  { title: '456 Elm St, Metropolis' },
  { title: '789 Oak Ave, Gotham' },
  { title: '789 Oak Ave, Gotham' },
  { title: '789 Oak Ave, Gotham' },
];
//---------------------------- End Step 1: Trip Details ---------------------------------



//---------------------------- Step 2: Transit Details ---------------------------------
const Step2Transits: React.FC = () => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedAddress, setEditedAddress] = useState('');

  const handleEdit = (index: number, address: string) => {
    setEditingIndex(index);
    setEditedAddress(address);
  };

  const handleSave = (index: number) => {
    // Here you can implement the logic to save the edited address
    dropoffLocations[index].title = editedAddress;
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  return (
    <>
      {/* Dropoff List Title Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '8px' }}>
        <IonText>
          <h4 style={{ margin: 0, fontWeight: 'bold', color: '#000', fontSize: '16px' }}>
            Drop-off Locations
          </h4>
        </IonText>
        <IonText>
          <h4 style={{ margin: 0, fontSize: '16px', color: '#b0b0b0', fontWeight: 'normal' }}>
            Total Transits: {dropoffLocations.length}
          </h4>
        </IonText>
      </div>

      {/* Scrollable Dropoff List */}
      <div style={{ maxHeight: '230px', overflowY: 'auto', marginTop: '8px' }}>
        <IonList>
          {dropoffLocations.map((location, index) => (
            <IonItem key={index} button={editingIndex !== index} detail={false}>
              <IonLabel>
                <h2>Drop-off {index + 1}</h2>
                {editingIndex === index ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <IonInput
                      value={editedAddress}
                      onIonInput={(e) => setEditedAddress(e.detail.value!)}
                      placeholder="Enter address"
                      className="custom-input"
                      style={{
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        padding: '8px',
                        marginTop: '4px',
                        '--padding-start': '12px',
                        '--padding-end': '12px',
                        backgroundColor: '#fff'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
                      <IonButton 
                        expand="block"
                        style={{ width: '50%', margin: 0, height: '40px' }}
                        color="medium"
                        fill="outline" 
                        onClick={handleCancel}
                        size="default"
                      >
                        Cancel
                      </IonButton>
                      <IonButton 
                        expand="block"
                        style={{ width: '50%', margin: 0, height: '40px' }}
                        onClick={() => handleSave(index)}
                        size="default"
                      >
                        Save
                      </IonButton>
                    </div>
                  </div>
                ) : (
                  <p>{location.title}</p>
                )}
              </IonLabel>
              {editingIndex !== index && (
                <IonButton 
                  slot="end" 
                  fill="solid" 
                  size='default'
                  onClick={() => handleEdit(index, location.title)}
                >
                  Edit
                </IonButton>
              )}
            </IonItem>
          ))}
        </IonList>
      </div>
    </>
  );
};
//---------------------------- End Step 2: Transit Details ---------------------------------



//---------------------------- Step 3: Truck Details ---------------------------------
const TRUCK_TYPES = [
  'Double A',
  'Double B',
  'B-Double',
  'Road Train',
  'Single Trailer'
];

const WEIGHT_CLASSES = [
  'Class 1 (0-6,000 lbs)',
  'Class 2 (6,001-10,000 lbs)',
  'Class 3 (10,001-14,000 lbs)',
  'Class 4 (14,001-16,000 lbs)',
  'Class 5 (16,001-19,500 lbs)',
  'Class 6 (19,501-26,000 lbs)',
  'Class 7 (26,001-33,000 lbs)',
  'Class 8 (33,001+ lbs)'
];

const ENGINE_TYPES = [
  'MP11 Engine 455HP',
  'MP8 Engine 505HP',
  'D13TC Engine 500HP',
  'X15 Engine 565HP',
  'DD15 Engine 505HP'
];

const Step3Truck: React.FC = () => {
  const [isEnginePopupOpen, setIsEnginePopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    truckType: 'Double A',
    weightClass: 'Class 2 (6,001-10,000 lbs)',
    engineInfo: 'MP11 Engine 455HP'
  });

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.detail.value
    });
  };

  const handleEnginePopupSave = (engineData: any) => {
    // Handle the saved engine data here
    console.log('Engine data:', engineData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select 
        label="Truck Type"
        placeholder="Select truck type"
        value={formData.truckType}
        onChange={handleChange('truckType')}
        options={TRUCK_TYPES}
        header="Select Truck Type"
      />
      <Select 
        label="Weight Class"
        placeholder="Select weight class"
        value={formData.weightClass}
        onChange={handleChange('weightClass')}
        options={WEIGHT_CLASSES}
        header="Select Weight Class"
      />

      {/* Custom flex container for Engine Info + Save button */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
        <div style={{ flex: 1 }}>
          <Select 
            label="Engine Info"
            placeholder="Select engine type"
            value={formData.engineInfo}
            onChange={handleChange('engineInfo')}
            options={ENGINE_TYPES}
            header="Select Engine Type"
          />
        </div>
        <IonButton 
          slot="end" 
          fill="solid" 
          size='default'
          onClick={() => setIsEnginePopupOpen(true)}
        >
          Edit
        </IonButton>
      </div>

      <TruckEnginePopup
        isOpen={isEnginePopupOpen}
        onClose={() => setIsEnginePopupOpen(false)}
        onSave={handleEnginePopupSave}
      />
    </div>
  );
};
//---------------------------- End Step 3: Truck Details ---------------------------------



//---------------------------- Step 4: Tracker Details ---------------------------------
const DEVICE_TYPES = [
  'GO9 Device',
  'GO8 Device',
  'GO7 Device',
  'GO6 Device',
  'GO RUGGED Device'
];

const Step4Tracker: React.FC = () => {
  const [formData, setFormData] = useState({
    licensePlate: 'EO291D',
    deviceName: 'GO9 Device',
    serialNumber: 'SI183NSA8'
  });

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.detail.value
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <IonItem lines="full" button detail={false} >
        <IonLabel>
          <h3>Telematics State:</h3>
        </IonLabel>
        <IonChip slot="end" color="success">Active</IonChip>
      </IonItem>
      <Input 
        label="License Plate" 
        placeholder="EO291D" 
        type="text" 
        value={formData.licensePlate}
        onChange={handleChange('licensePlate')}
      />
      <Select 
        label="Device Name"
        placeholder="Select device type"
        value={formData.deviceName}
        onChange={handleChange('deviceName')}
        options={DEVICE_TYPES}
        header="Select Device Type"
      />
      <Input 
        label="Serial Number" 
        placeholder="SI183NSA8" 
        type="text" 
        value={formData.serialNumber}
        onChange={handleChange('serialNumber')}
      />
    </div>
  );
};
//---------------------------- End Step 4: Tracker Details ---------------------------------



interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '16px',
      width: '100%'
    }}>
      {steps.map((title, index) => (
        <div key={index} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: currentStep === index + 1 ? '#3880ff' : '#e4e4e4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: currentStep === index + 1 ? 'white' : '#6e6e6e',
            fontWeight: 'bold'
          }}>
            {index + 1}
          </div>
          <IonText style={{
            color: currentStep === index + 1 ? '#3880ff' : '#6e6e6e',
            fontSize: '12px'
          }}>
            {title}
          </IonText>
        </div>
      ))}
    </div>
  );
};

export {
  Step1Trip,
  Step2Transits,
  Step3Truck,
  Step4Tracker,
  StepIndicator,
  MultiPageForm
};