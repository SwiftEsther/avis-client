import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader,ModalFooter, Button, Form, FormGroup, Label, Input, } from 'reactstrap';
import axios from 'axios';

export default class UpdateVehicle extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          modal: true,
        //   tagId: '',
        //   owner: '',
        //   plate: '',
        //   insuranceExp: '',
        //   roadWorthiness: '',
        //   vehicleLicenseExp: ''
            id: this.props.currentRow._id,
            tagId: this.props.currentRow.tag_id,
            owner: this.props.currentRow.owner,
            plate: this.props.currentRow.plate_no,
            insuranceExp: this.props.currentRow.insurance_exp,
            roadWorthiness: this.props.currentRow.road_worthiness,
            vehicleLicenseExp: this.props.currentRow.vehicle_license_exp
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
    
    updateVehicle = () => {
        const vehicle = {
            tag_id: this.state.tagId,
            owner: this.state.owner,
            plate_no: this.state.plate,
            insurance_exp: this.state.insuranceExp,
            road_worthiness: this.state.roadWorthiness,
            vehicle_license_exp: this.state.vehicleLicenseExp
        }
        axios.put(`http://localhost:4000/api/vehicle/${this.state.id}`, {...vehicle})
            .then((response) => {
                this.toggle();
                alert(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        const {currentRow} = this.state;
        return(
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Update Vehicle</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="tagId">Tag Id</Label>
                            <Input type="text" name="tagId" placeholder="" onChange={this.handleInputChange} value={this.state.tagId}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="owner">Owner</Label>
                            <Input type="text" name="owner" placeholder=""  onChange={this.handleInputChange} value={this.state.owner} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="plate">Plate No</Label>
                            <Input type="text" name="plate" placeholder=""  onChange={this.handleInputChange} value={this.state.plate} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="roadWorthiness">Road Worthiness</Label>
                            <Input type="text" name="roadWorthiness" placeholder=""  onChange={this.handleInputChange} value={this.state.roadWorthiness} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="insuranceExp">Insurance Expiry</Label>
                            <Input type="text" name="insuranceExp" placeholder=""  onChange={this.handleInputChange} value={this.state.insuranceExp} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="vehicleLicenseExp">Vehicle License Expiry</Label>
                            <Input type="text" name="vehicleLicenseExp" placeholder=""  onChange={this.handleInputChange} value={this.state.vehicleLicenseExp} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.updateVehicle}>Update</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
};