import React from 'react';

const LaunchDistribution = ({ entries }) => {
    return (
        <div>
            <h3>Сохраненные записи:</h3>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th></th>
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
                    {entries.map((entry, index) => (
                        <tr key={index}>
                            <td><input type="checkbox" id={index}></input></td>
                            {Object.keys(entry).map((key) => (
                                <td key={key}>{key === 'date' ? new Date(entry[key]).toLocaleDateString() : entry[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LaunchDistribution;
