import React, {Fragment, useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import AddAndEditBuildings from "./AddAndEditBuildings";

const EditingBuildings = ({ values, handleEditBuildings, index }) => {
    const [visible, setVisible] = useState(false)
    var button = <button className="edit-button">Редактировать</button>;
    const [inputBuildings, setInputBuildings] = useState({
        building_id: values.building_id,
        possession_beginning_date: values.possession_beginning_date,
        possession_ending_date: values.possession_ending_date,
        measurement_ending_date: values.measurement_ending_date,
        measurement_beginning_date: values.measurement_beginning_date,
        square: values.square,
        measure_unit: values.measure_unit
    });

    const toggle = () => {
        setVisible(!visible)
    }

    const handleInputChangeBuildings = (event) => {
        const { name, value } = event.target;
        setInputBuildings({ ...inputBuildings, [name]: value });

    };

    const handleSave = () => {
        handleEditBuildings(index, inputBuildings);
        toggle();
    }

    const handleDateChangeBuildings = ( possession_beginning_date,
                                        possession_ending_date,
                                        measurement_ending_date,
                                        measurement_beginning_date) => {
        setInputBuildings({
          ...inputBuildings,
          ['possession_beginning_date']: possession_beginning_date,
          ['possession_ending_date']: possession_ending_date,
          ['measurement_ending_date']: measurement_ending_date,
          ['measurement_beginning_date']: measurement_beginning_date
    });
    };

    return (
        <div>
        {button}
        <Modal isOpen={visible} toggle={toggle} size="lg" style={{minWidth: '90%'}}>
            <ModalHeader style={{justifyContent: "center"}}>
                Редактировать
            </ModalHeader>
            <ModalBody>
                <label>
                    Введите значения:
                    <AddAndEditBuildings
                        inputBuildings={inputBuildings}
                        handleInputChangeBuildings={handleInputChangeBuildings}
                        handleDateChangeBuildings={handleDateChangeBuildings}>
                    </AddAndEditBuildings>
                </label>
                <button className="save-button" onClick={handleSave}>Сохранить</button>
            </ModalBody>
        </Modal>
        </div>
    )}
export default EditingBuildings;
