import React from 'react';

const DistributionObjects = ({ activeSubsection, setActiveSubsection, subsections }) => {
    return (
        <div>
            {!activeSubsection ? (
                <div>
                    <div className="subnav">
                        {Object.keys(subsections).map((subsection) => (
                            <a href="#" key={subsection} onClick={() => setActiveSubsection(subsection)}>
                                {subsections[subsection]}
                            </a>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <button onClick={() => setActiveSubsection('')}>Назад</button>
                    {activeSubsection === 'buildings' && (
                        <div>
                            <h3>Ведение справочника зданий</h3>
                            <table className="handbook-buildings">
                                <thead>
                                <tr>
                                    <th>Здание</th>
                                    <th>Начало владения</th>
                                    <th>Конец владения</th>
                                    <th>Измерение действит. по</th>
                                    <th>Измерение действит. с</th>
                                    <th>Площадь</th>
                                    <th>Единица измерения</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeSubsection === 'fixed-assets' && (
                        <div>
                            <h3>Ведение справочника основных средств</h3>
                            <table className="handbook-fixed-assets">
                                <thead>
                                <tr>
                                    <th>ID основного средства</th>
                                    <th>Класс основного средства</th>
                                    <th>Признак "Используется в основной деятельности"</th>
                                    <th>Признак "Способ использования"</th>
                                    <th>Площадь</th>
                                    <th>ЕИ площади</th>
                                    <th>ID здания</th>
                                    <th>Дата начала действия связи с зданием</th>
                                    <th>Дата окончания действия связи с зданием</th>
                                    <th>Дата ввода в эксплуатацию</th>
                                    <th>Дата выбытия</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeSubsection === 'services' && (
                        <div>
                            <h3>Ведение справочника работ/услуг</h3>
                            <table className="handbook-services">
                                <thead>
                                <tr>
                                    <th>ID услуги</th>
                                    <th>Класс услуги</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeSubsection === 'contracts' && (
                        <div>
                            <h3>Ведение справочника договоров</h3>
                            <table className="handbook-contracts">
                                <thead>
                                <tr>
                                    <th>ID договора</th>
                                    <th>Дата начала действия договора</th>
                                    <th>Дата окончания действия договора</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DistributionObjects;
