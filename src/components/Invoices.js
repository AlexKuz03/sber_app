import React from 'react';
import DatePicker from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import MyDropzone from './MyDropzone';
import EditingInvoices from './EditingInvoices';

const Invoices = ({
                      inputValues,
                      handleInputChange,
                      handleDateChange,
                      handleSubmit,
                      entries,
                      handleDelete,
                      handleEdit
                  }) => {
    return (
        <div>
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
            <button onClick={handleSubmit}>Сохранить</button>
            <MyDropzone/>
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
                                <td key={key}>{key === 'date' ? new Date(entry[key]).toLocaleDateString() : entry[key]}</td>
                            ))}
                            <td>
                                <button onClick={() => handleDelete(index)}>Удалить</button>
                            </td>
                            <td>
                                <EditingInvoices values={entry} handleDateChange={handleDateChange}
                                                 handleEdit={handleEdit} index={index}></EditingInvoices>
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
