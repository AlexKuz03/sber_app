import React from 'react';

const LaunchDistribution = ({ entries, handleLaunchDistribution }) => {
    return (
        <div>
        <button className="launch" onClick={handleLaunchDistribution}>Запустить</button>
            <h3>Записи к распределению</h3>
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
                {entries.map((entry, index) => (
                    <tr key={index}>
                        {Object.keys(entry).map((key) => (
                            <td key={key}>{key === 'invoice_reflection_in_the_accounting_system_date'
                            ? entry[key] ? new Date(entry[key]).toLocaleDateString() : ''
                            : entry[key]}</td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default LaunchDistribution;
