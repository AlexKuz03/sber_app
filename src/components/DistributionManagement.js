import React from 'react';
import EditingDistributionManagement from "./EditingDistributionManagement";
import EditingDist from "./EditingDist";

const DistributionManagement = ({
                handleSaveDistribution,
                data,
                handleDeleteDistribution,
                handleDateChangeDistribution,
                handleEditDistribution,
                handleSaveInFile,

              }) => {
    return (
        <div>
        <button className="save" onClick={handleSaveDistribution}>Сохранить в базу данных</button>
        <button className="save" onClick={handleSaveInFile}>Сохранить в файл</button>
        <div>
            <table className="distribution-table">
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
                    <th>Удаление</th>
                    <th>Редактирование</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.keys(item).map((key) => (
                            <td key={key}>{ key === 'reflection_in_the_accounting_system_date' ? new Date(item[key]).toLocaleDateString() :
                                (key === 'is_used_in_main_activity' || key === 'is_used_in_rent') ? (item[key] ? "X" : "") : item[key]}
                            </td>
                        ))}
                        <td>
                            <button className="delete-button" onClick={() => handleDeleteDistribution(index)}>Удалить</button>
                        </td>
                        <td>
                            <EditingDist
                                values={item}
                                handleDateChange={handleDateChangeDistribution}
                                handleEdit={handleEditDistribution}
                                index={index}>
                            </EditingDist>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default DistributionManagement;
