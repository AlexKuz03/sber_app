import React, {Fragment, useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import AddAndEditTable from "./AddAndEditTable";
import EditDistTable from "./EditDistTable";
import EditingDist from "./EditingDist";

const EditingDistributionManagement = ({ values, handleEdit, index }) => {
    const [visible, setVisible] = useState(false)
    var button = <button className="edit-button" onClick={() => toggle()}>Редактировать</button>;
    const [distributionValues, setDistributionValues] = useState({
        company: values.company,
        year: values.year,
        invoice_number: values.invoice_number,
        invoice_position: values.invoice_position,
        distribution_position_number: values.distribution_position_number,
        reflection_in_the_accounting_system_date: values.reflection_in_the_accounting_system_date,
        contract_id: values.contract_id,
        service_id: values.service_id,
        service_class: values.service_class,
        building_id: values.building_id,
        fixed_asset_class: values.fixed_asset_class,
        fixed_asset_id: values.fixed_asset_id,
        is_used_in_main_activity: values.is_used_in_main_activity,
        is_used_in_rent: values.is_used_in_rent,
        square: values.square,
        distribution_sum: values.distribution_sum,
        general_ledger_account: values.general_ledger_account
    });

    const toggle = () => {
        setVisible(!visible)
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDistributionValues({ ...distributionValues, [name]: value });

    };
    const handleSave = () => {
        handleEdit(index, distributionValues);
        toggle();
    }
    const handleDateChange = (invoice_reflection_in_the_accounting_system_date) => {
        setDistributionValues({ ...distributionValues, ['invoice_reflection_in_the_accounting_system_date']: invoice_reflection_in_the_accounting_system_date });
    };

    return (
        <div>
        {button}
        <Modal isOpen={visible} toggle={toggle} size="lg" style={{minWidth: '90%'}}>>
            <ModalHeader style={{justifyContent: "center"}}>
                Редактировать
            </ModalHeader>
            <ModalBody>
                <label>
                    Введите значения:
                    <EditingDist
                        distributionValues={distributionValues}
                        handleInputChange={handleInputChange}
                        handleDateChange={handleDateChange}>
                    </EditingDist>
                </label>
                <button className="save-button" onClick={handleSave}>Сохранить</button>
            </ModalBody>
        </Modal>
        </div>
    )}
export default EditingDistributionManagement;
