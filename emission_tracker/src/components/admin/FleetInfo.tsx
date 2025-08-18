import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import DeleteModal from './DeleteFleetModal';
import '../../theme/general.scss';
import './FleetInfo.scss';
import { useGeotabData } from '../../hooks/useGeotabData';
import { useTruckEmissions } from '../../hooks/useTruckEmissions';

const FleetInfo: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { trips } = useGeotabData();
  const { trucks } = useTruckEmissions();

  const managerName = 'John Davis'; // placeholder or load dynamically if available

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthTrips = trips.filter((trip) => {
    const d = new Date(trip.rawStart);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const uniqueDrivers = new Set<string>();
  monthTrips.forEach((trip) => {
    if (trip.driver !== '–') {
      uniqueDrivers.add(trip.driver);
    }
  });
  const numDrivers = uniqueDrivers.size;
  const numTrucks = trucks.length;

  let sumCO = 0,
    sumCO2 = 0,
    sumHC = 0,
    sumNOx = 0,
    sumPM = 0;
  monthTrips.forEach((trip) => {
    sumCO += parseFloat(trip.CO);
    sumCO2 += parseFloat(trip.CO2);
    sumHC += parseFloat(trip.HC);
    sumNOx += parseFloat(trip.NOx);
    sumPM += parseFloat(trip.PM);
  });

  const handleDelete = () => {
    setShowDeleteModal(false);
    console.log('Fleet deleted');
  };

  return (
    <>
      <div className="fleet-card">
        <div className="fleet-card-header">
          <h2 className="fleet-card-title">VerdaMove</h2>
          <IonIcon
            icon={trashOutline}
            className="trash-icon"
            onClick={() => setShowDeleteModal(true)}
          />
        </div>

        <div className="fleet-card-divider" />

        <div className="fleet-details">
          <div className="fleet-left">
            <div className="fleet-row">
              <span className="fleet-label">Manager:</span>
              <span className="fleet-value">{managerName}</span>
            </div>
            <div className="fleet-row">
              <span className="fleet-label">Trucks:</span>
              <span className="fleet-value">{numTrucks}</span>
            </div>
            <div className="fleet-row">
              <span className="fleet-label">Drivers:</span>
              <span className="fleet-value">{numDrivers}</span>
            </div>
          </div>

          <div className="fleet-right">
            <div className="fleet-row">
              <span className="fleet-label">Carbon Monoxide (CO):</span>
              <span className="fleet-value">{sumCO.toFixed(2)} g</span>
            </div>
            <div className="fleet-row">
              <span className="fleet-label">Carbon Dioxide (CO<sub>2</sub>):</span>
              <span className="fleet-value">{sumCO2.toFixed(2)} g</span>
            </div>
            <div className="fleet-row">
              <span className="fleet-label">Hydrocarbons (HC):</span>
              <span className="fleet-value">{sumHC.toFixed(2)} g</span>
            </div>
            <div className="fleet-row">
              <span className="fleet-label">Nitrogen Oxides (NO<sub>x</sub>):</span>
              <span className="fleet-value">{sumNOx.toFixed(2)} g</span>
            </div>
            <div className="fleet-row">
              <span className="fleet-label">Particulate Matter (PM2.5):</span>
              <span className="fleet-value">{sumPM.toFixed(2)} g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default FleetInfo;