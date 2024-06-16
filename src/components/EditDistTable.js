import DatePicker from "react-datepicker";
import React from "react";
import ru from 'date-fns/locale/ru';
const EditDistTable = ({inputValues, handleInputChange, handleDateChange}) => {
    return (
        <table className="custom-table">
            {console.log(inputValues.reflection_in_the_accounting_system_date)}
            <thead>
            <tr>
                <th>Компания</th>
                <th>Год счета</th>
                <th>Номер счета</th>
                <th>Позиция счета</th>
                <th>Номер позиции распределения</th>
                <th>Дата отражения счета в учетной системе</th>
                <th>ID договора</th>
                <th>Услуга</th>
                <th>ID услуги</th>
                <th>Здание</th>
                <th>Класс ОС</th>
                <th>ID основного средства</th>
                <th>Признак использования в основной деятельности</th>
                <th>Признак передачи в аренду</th>
                <th>Площадь</th>
                <th>Сумма распределения</th>
                <th>Счет главной книги</th>
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
                        name="distribution_position_number"
                        value={inputValues.distribution_position_number}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <DatePicker
                        selected={inputValues.reflection_in_the_accounting_system_date}
                        onChange={(date) => handleDateChange(date)}
                        dateFormat="dd-MM-yyyy"
                        locale={ru}
                        wrapperClassName="width-date-picker"
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
                        name="service_class"
                        value={inputValues.service_class}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="building_id"
                        value={inputValues.building_id}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="fixed_asset_class"
                        value={inputValues.fixed_asset_class}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="fixed_asset_id"
                        value={inputValues.fixed_asset_id}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="is_used_in_main_activity"
                        value={inputValues.is_used_in_main_activity}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="is_used_in_rent"
                        value={inputValues.is_used_in_rent}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="square"
                        value={inputValues.square}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="distribution_sum"
                        value={inputValues.distribution_sum}
                        onChange={handleInputChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="general_ledger_account"
                        value={inputValues.general_ledger_account}
                        onChange={handleInputChange}
                    />
                </td>
            </tr>
            </tbody>
        </table>

    )
}
export default EditDistTable;