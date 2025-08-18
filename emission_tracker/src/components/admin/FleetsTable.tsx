import React, { useState, useEffect } from 'react';
import '../../theme/general.scss';
import './FleetsTable.scss';
import AddFleetModal from './AddFleetModal';
import axios from 'axios';

interface FleetData {
  name: string;
  manager: string;
  trucks: number;
  co2: string;
}

const FleetsTable: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [fleets, setFleets] = useState<FleetData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;

  useEffect(() => {
    axios.get('http://localhost:4000/api/fleets')
      .then(res => setFleets(res.data))
      .catch(err => console.error('Failed to fetch fleets:', err));
  }, []);

  const totalResults = fleets.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const paginatedFleets = fleets.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="fleets-table-wrapper">
        <div className="fleets-header">
          <h3>Fleets</h3>
          <button className="add-fleet" onClick={() => setShowModal(true)}>Add fleet</button>
        </div>
        <table className="fleets-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manager</th>
              <th>Trucks</th>
              <th>Carbon Dioxide</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFleets.map((fleet, index) => (
              <tr key={index}>
                <td>{fleet.name}</td>
                <td>{fleet.manager}</td>
                <td>{fleet.trucks}</td>
                <td>{fleet.co2}</td>
                <td>
                  <a href="/admin/fleet-details" style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    More Info
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="nav-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'‹'} Back
          </button>
          <span className="pages">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`page-btn ${page === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <span className="ellipsis">…</span>
            <button className="page-btn" onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </button>
          </span>
          <button
            className="nav-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next {'›'}
          </button>
          <div className="results-count">
            Showing {Math.min(currentPage * resultsPerPage, totalResults)} of {totalResults} results
          </div>
        </div>
      </div>

      <AddFleetModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default FleetsTable;
