import React from 'react';

const DistributionManagement = ({
                handleSaveDistribution,
                data,
                handleDeleteDistribution,
                EditingDistributionManagement,
                handleDateChangeDistribution,
                handleEditDistribution,
                handleSaveInFile
              }) => {
    return (
        <div>
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
                </tr>
                </thead>
                <tbody>
                {data.map((isdata, index) => (
                    <tr key={index}>
                        {Object.keys(isdata).map((key) => (
                            <td key={key}>{key === 'invoice_reflection_in_the_accounting_system_date'
                            ? new Date(isdata[key]).toLocaleDateString()
                            : isdata[key]}</td>
                        ))}
                        <td>
                            <button class="delete-button" onClick={() => handleDeleteDistribution(index)}>Удалить</button>
                        </td>
                        <td>
                            <EditingDistributionManagement
                                values={isdata}
                                handleDateChange={handleDateChangeDistribution}
                                handleEdit={handleEditDistribution}
                                index={index}>
                            </EditingDistributionManagement>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button class="save" onClick={handleSaveDistribution}>Сохранить в базу данных</button>
            <button class="save" onClick={handleSaveInFile}>Сохранить в файл</button>
        </div>
        </div>
    );
};

export default DistributionManagement;
