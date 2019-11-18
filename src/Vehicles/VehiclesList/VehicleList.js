import React, {Component, Fragment} from 'react';
import './VehicleList.css'
import {Table, Button, Spinner, Badge} from 'reactstrap';
import CreateVehicle from '../CreateVehicle/CreateVehicle';
import axios from 'axios';
import UpdateVehicle from '../UpdateVehicle/UpdateVehicle';

export default class VehicleList extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          vehicles: [],
          showCreateModal: false,
          showUpdateModal: false,
          currentRow: {},
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/vehicles')
            .then((response) => {
                this.setState({vehicles: response.data.vehicles});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    openCreateModal = () => {
        this.setState({showCreateModal: true})
    }

    openUpdateModal = (vehicle) => {
        this.setState({showUpdateModal: true, currentRow: vehicle});
    }

    render() {
        return(
            <div className="vehicles-list">
                <h2 className="table-header">Vehicles on the road</h2>
                <div className="create-btn">
                     <Button color="primary" onClick = {this.openCreateModal}>Create New</Button>
                </div>

                <Table striped>
                <thead>
                <tr>
                    <th>Tag Id</th>
                    <th>Owner</th>
                    <th>Plate No</th>
                    <th>Road Worthiness</th>
                    <th>Vehicle License</th>
                    <th>Insurance</th>
                    <th>Road Worthiness Expired</th>
                    <th>Vehicle License Expired</th>
                    <th>Insurance Expired</th>
                </tr>
                </thead>
                {this.state.vehicles.length > 0 &&
                <tbody>
                    {this.state.vehicles.map((vehicle, index) => (
                    <tr key={index} onClick={()=>(this.openUpdateModal(vehicle))}>
                            <td>{vehicle.tag_id}</td>
                            <td>{vehicle.owner}</td>
                            <td>{vehicle.plate_no}</td>
                            <td>{vehicle.road_worthiness}</td>
                            <td>{vehicle.insurance_exp}</td>
                            <td>{vehicle.vehicle_license_exp}</td>
                            <td>{((new Date() - new Date(vehicle.road_worthiness)) > 0)?<Badge color="success">True</Badge>: <Badge color="danger">false</Badge>}</td>
                            <td>{((new Date() - new Date(vehicle.insurance_exp)) > 0)?<Badge color="success">True</Badge>: <Badge color="danger">false</Badge>}</td>
                            <td>{((new Date() - new Date(vehicle.vehicle_license_exp)) > 0)?<Badge color="success">True</Badge>: <Badge color="danger">false</Badge>}</td>
                        </tr>
                    ))}
                </tbody>}
            </Table>
                {this.state.showCreateModal && <CreateVehicle  />}
                {this.state.showUpdateModal && <UpdateVehicle currentRow = {this.state.currentRow}/>}
            </div>
        )
    }
};