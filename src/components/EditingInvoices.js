import React, {Fragment, useState} from "react";
import 'react-datepicker/dist/react-datepicker.css';
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import AddAndEditTable from "./AddAndEditTable";

const EditingInvoices = ({ values, handleEdit, index }) => {
    const [visible, setVisible] = useState(false)
    var button = <button class="edit-button" onClick={() => toggle()}>Редактировать</button>;
    const [inputValues, setInputValues] = useState({
        company: values.company,
        year: values.year,
        invoice_number: values.invoice_number,
        invoice_position: values.invoice_position,
        service_id: values.service_id,
        contract_id: values.contract_id,
        invoice_reflection_in_the_accounting_system_date: values.invoice_reflection_in_the_accounting_system_date,
        cost_excluding_VAT: values.cost_excluding_VAT
    });
    const toggle = () => {
        setVisible(!visible)
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    const handleSave = () => {
        handleEdit(index, inputValues);
        toggle();
    }
    const handleDateChange = (invoice_reflection_in_the_accounting_system_date) => {
        setInputValues({ ...inputValues, ['invoice_reflection_in_the_accounting_system_date']: invoice_reflection_in_the_accounting_system_date });
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
                    <AddAndEditTable
                        inputValues={inputValues}
                        handleInputChange={handleInputChange}
                        handleDateChange={handleDateChange}>
                    </AddAndEditTable>
                </label>
                <button class="save-button" onClick={handleSave}>Сохранить</button>
            </ModalBody>
        </Modal>
        </div>
    )}
export default EditingInvoices;
