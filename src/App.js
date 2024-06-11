import React, { useState } from 'react';
import './App.css';
import Invoices from './components/Invoices';
import DistributedInvoices from './components/DistributedInvoices';
import LaunchDistribution from './components/LaunchDistribution';
import DistributionManagement from './components/DistributionManagement';
import CostForecasting from './components/CostForecasting';
import DistributionObjects from './components/DistributionObjects';

const App = () => {
    const [activeSection, setActiveSection] = useState('launch-distribution');
    const [activeSubsection, setActiveSubsection] = useState('');
    const [inputValues, setInputValues] = useState({
        company: '',
        year: '',
        bill: '',
        billposition: '',
        IDservices: '',
        IDagreement: '',
        date: new Date(),
        cost: ''
    });
    const [entries, setEntries] = useState([]);

    const sections = {
        'invoices': 'Счета на оплату',
        'distributed-invoices': 'Распределенные счета на оплату',
        'launch-distribution': 'Запуск распределения',
        'distribution-management': 'Управление распределением',
        'cost-forecasting': 'Прогнозирование и контроль затрат',
        'distribution-objects': 'Объекты распределения'
    };

    const subsections = {
        'buildings': 'Ведение справочника зданий',
        'assets': 'Ведение справочника основных средств',
        'services': 'Ведение справочника работ/услуг',
        'contracts': 'Ведение справочника договоров'
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleDateChange = (date) => {
        setInputValues({ ...inputValues, date });
    };

    const handleSubmit = () => {
        setEntries([...entries, inputValues]);
        setInputValues({
            company: '',
            year: '',
            bill: '',
            billposition: '',
            IDservices: '',
            IDagreement: '',
            date: new Date(),
            cost: ''
        });
    };

    const handleDelete = (index) => {
        const newEntries = entries.filter((_, i) => i !== index);
        setEntries(newEntries);
    };

    return (
        <div>
            <div className="nav">
                {Object.keys(sections).map((section) => (
                    <a href="#" key={section} onClick={() => { setActiveSection(section); setActiveSubsection(''); }}>
                        {sections[section]}
                    </a>
                ))}
            </div>

            <div className="content">
                <div key={activeSection} id={activeSection} className={`section active`}>
                    <h2>{sections[activeSection]}</h2>
                    {activeSection === 'invoices' && (
                        <Invoices
                            inputValues={inputValues}
                            handleInputChange={handleInputChange}
                            handleDateChange={handleDateChange}
                            handleSubmit={handleSubmit}
                            entries={entries}
                            handleDelete={handleDelete}
                        />
                    )}
                    {activeSection === 'distributed-invoices' && (
                        <DistributedInvoices />
                    )}
                    {activeSection === 'launch-distribution' && (
                        <LaunchDistribution entries={entries} />
                    )}
                    {activeSection === 'distribution-management' && (
                        <DistributionManagement />
                    )}
                    {activeSection === 'cost-forecasting' && (
                        <CostForecasting />
                    )}
                    {activeSection === 'distribution-objects' && (
                        <DistributionObjects
                            activeSubsection={activeSubsection}
                            setActiveSubsection={setActiveSubsection}
                            subsections={subsections}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
