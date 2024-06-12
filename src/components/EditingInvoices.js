import DatePicker from "react-datepicker";
import React, {Fragment, useState} from "react";
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import {Modal, ModalBody, ModalHeader} from "reactstrap";

const EditingInvoices = ({ values,  handleDateChange, handleEdit, index }) => {
    const [visible, setVisible] = useState(false)
    var button = <button onClick={() => toggle()}>Редактировать</button>;
    const [inputValues, setInputValues] = useState({
        company: values.company,
        year: values.year,
        bill: values.bill,
        billposition: values.billposition,
        IDservices: values.IDservices,
        IDagreement: values.IDagreement,
        date: values.date,
        cost: values.cost
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
                    <table className="custom-table">
                        <thead>
                        <tr>
                            <th>Компания</th>
                            <th>Год</th>
                            <th>Номер счета</th>
                            <th>Позиция счета</th>
                            <th>ID услуги</th>
                            <th>ID договора</th>
                            <th>Дата отражения счета в учетной системе</th>
                            <th>Стоимость без НДС</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="company"
                                    value={inputValues.company}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="year"
                                    value={inputValues.year}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="bill"
                                    value={inputValues.bill}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="billposition"
                                    value={inputValues.billposition}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="IDservices"
                                    value={inputValues.IDservices}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="IDagreement"
                                    value={inputValues.IDagreement}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <DatePicker
                                    selected={inputValues.date}
                                    onChange={handleDateChange}
                                    dateFormat="dd-MM-yyyy"
                                    locale={ru}
                                    wrapperClassName="width-date-picker"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="cost"
                                    value={inputValues.cost}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </label>
                <button onClick={handleSave}>Сохранить</button>
            </ModalBody>
        </Modal>
        </div>
    )}
export default EditingInvoices;