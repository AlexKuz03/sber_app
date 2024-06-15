import React from 'react';

const DistributionManagement = ( handleSaveDistribution ) => {
    return (
        <div>
        <div>
            <table className="distribution-table">
                <thead>
                <tr>
                    <th>Номер п/п</th>
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

                </tbody>
            </table>
            <button class="save" onClick={handleSaveDistribution}>Сохранить</button>
        </div>
        </div>
    );
};

export default DistributionManagement;
