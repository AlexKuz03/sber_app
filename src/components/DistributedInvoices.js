import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MyDropzone from './MyDropzone';
import ru from 'date-fns/locale/ru';
import DatePicker from "react-datepicker";
import EditingInvoices from "./EditingInvoices";

const DistributedInvoices = ({historyDistributionData, handleLoadHistory}) => {

    return (
        <div>
        <button className="load" onClick={handleLoadHistory}>Загрузить историю</button>
        <table className="distributed-invoices">
            <thead>
            <tr>
                <th>ID</th>
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
            {historyDistributionData.map((entry, index) => (
                <tr key={index}>
                    {Object.keys(entry).map((key) => (
                        <td key={key}>{key === 'invoice_reflection_in_the_accounting_system_date'
                            ? new Date(entry[key]).toLocaleDateString()
                            : entry[key]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    );
};

export default DistributedInvoices;
