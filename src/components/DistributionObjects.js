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
                            <p>Содержимое для справочника зданий</p>
                        </div>
                    )}
                    {activeSubsection === 'assets' && (
                        <div>
                            <h3>Ведение справочника основных средств</h3>
                            <p>Содержимое для справочника основных средств</p>
                        </div>
                    )}
                    {activeSubsection === 'services' && (
                        <div>
                            <h3>Ведение справочника работ/услуг</h3>
                            <p>Содержимое для справочника работ/услуг</p>
                        </div>
                    )}
                    {activeSubsection === 'contracts' && (
                        <div>
                            <h3>Ведение справочника договоров</h3>
                            <p>Содержимое для справочника договоров</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DistributionObjects;
