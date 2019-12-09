import React from 'react';
import logo from './logo.svg';
import VehicleList from './Vehicles/VehiclesList/VehicleList';
import VehiclesOnRoadList from './Vehicles/VehiclesOnRoadList/VehilclesOnRoadList';
import './App.css';

function App() {
  return (
    <div className="">
      {/* <VehiclesOnRoadList /> */}
      <VehicleList />
    </div>
  );
}

export default App;
