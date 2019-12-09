import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader,ModalFooter, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import axios from 'axios';

export default class CreateVehicle extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          modal: true,
          tagId: '',
          owner: '',
          plate: '',
          insuranceExp: '',
          roadWorthiness: '',
          vehicleLicenseExp: ''
        };
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    createVehicle = () => {
        const vehicle = {
            tag_id: this.state.tagId,
            owner: this.state.owner,
            plate_no: this.state.plate,
            insurance_exp: this.state.insuranceExp,
            road_worthiness: this.state.roadWorthiness,
            vehicle_license_exp: this.state.vehicleLicenseExp
        }
        axios.post('http://localhost:4000/api/vehicles', {...vehicle})
            .then((response) => {
                this.toggle();
                alert(response.data.message);
                axios.get('http://localhost:4000/api/vehicles');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return(
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Create Vehicle</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                        <Label for="tagId">Tag Id</Label>
                        <Input type="text" name="tagId" placeholder="" onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="owner">Owner</Label>
                        <Input type="text" name="owner" placeholder=""  onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="plate">Plate No</Label>
                        <Input type="text" name="plate" placeholder=""  onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="roadWorthiness">Road Worthiness</Label>
                        <Input type="text" name="roadWorthiness" placeholder=""  onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="insuranceExp">Insurance Expiry</Label>
                        <Input type="text" name="insuranceExp" placeholder=""  onChange={this.handleInputChange}/>
                        </FormGroup>
                        <FormGroup>
                        <Label for="vehicleLicenseExp">Vehicle License Expiry</Label>
                        <Input type="text" name="vehicleLicenseExp" placeholder=""  onChange={this.handleInputChange} value = {this.state.vehicle_license_exp}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.createVehicle}>Create</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
};