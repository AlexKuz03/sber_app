import DatePicker from "react-datepicker";
import React from "react";
import ru from 'date-fns/locale/ru';
const AddAndEditTable = ({inputValues, handleInputChange, handleDateChange}) => {
    return (
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
                        name="invoice_number"
                        value={inputValues.invoice_number}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="invoice_position"
                        value={inputValues.invoice_position}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="service_id"
                        value={inputValues.service_id}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="contract_id"
                        value={inputValues.contract_id}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <DatePicker
                        selected={inputValues.invoice_reflection_in_the_accounting_system_date}
                        onChange={(date) => handleDateChange(date)}
                        dateFormat="dd-MM-yyyy"
                        locale={ru}
                        wrapperClassName="width-date-picker"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="cost_excluding_VAT"
                        value={inputValues.cost_excluding_VAT}
                        onChange={handleInputChange}
                    />
                </td>
            </tr>
            </tbody>
        </table>
    )
}
export default AddAndEditTable;