import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MyDropzone from './MyDropzone';
import EditingInvoices from './EditingInvoices';
import AddAndEditTable from "./AddAndEditTable";
import ru from 'date-fns/locale/ru';
import DatePicker from "react-datepicker";

const Invoices = ({
                      inputValues,
                      handleInputChange,
                      handleDateChange,
                      handleSubmit,
                      entries,
                      handleDelete,
                      handleEdit,
                      handleSaveImportEntries
                  }) => {
    return (
        <div>
            Введите значения:
            <AddAndEditTable
                inputValues={inputValues}
                handleInputChange={handleInputChange}
                handleDateChange={handleDateChange}>
            </AddAndEditTable>
            <button class="save-button" onClick={handleSubmit}>Сохранить</button>
            <MyDropzone handleSaveImportEntries={handleSaveImportEntries}/>
            <div>
                <h3>Сохраненные записи:</h3>
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
                        <th>Удаление</th>
                        <th>Редактирование</th>
                    </tr>
                    </thead>
                    <tbody>
                    {entries.map((entry, index) => (
                        <tr key={index}>
                            {Object.keys(entry).map((key) => (
                                <td key={key}>{key === 'invoice_reflection_in_the_accounting_system_date'
                                ? new Date(entry[key]).toLocaleDateString()
                                : entry[key]}</td>
                            ))}
                            <td>
                                <button class="delete-button" onClick={() => handleDelete(index)}>Удалить</button>
                            </td>
                            <td>
                                <EditingInvoices
                                    values={entry}
                                    handleDateChange={handleDateChange}
                                    handleEdit={handleEdit}
                                    index={index}></EditingInvoices>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoices;
