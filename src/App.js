import React, { useState } from 'react';
import './App.css';
import Invoices from './components/Invoices';
import DistributedInvoices from './components/DistributedInvoices';
import LaunchDistribution from './components/LaunchDistribution';
import DistributionManagement from './components/DistributionManagement';
import EditingDistributionManagement from './components/EditingDistributionManagement';
import CostForecasting from './components/CostForecasting';
import DistributionObjects from './components/DistributionObjects';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [activeSection, setActiveSection] = useState('invoices');
    const [activeSubsection, setActiveSubsection] = useState('');

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const toggleLoginModal = () => setIsLoginModalOpen(!isLoginModalOpen);
    const toggleRegisterModal = () => setIsRegisterModalOpen(!isRegisterModalOpen);

    const [inputValues, setInputValues] = useState({
        company: '',
        year: '',
        invoice_number: '',
        invoice_position: '',
        service_id: '',
        contract_id: '',
        invoice_reflection_in_the_accounting_system_date: new Date(),
        cost_excluding_VAT: ''
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

    const handleDateChange = (invoice_reflection_in_the_accounting_system_date) => {
        setInputValues({ ...inputValues, ['invoice_reflection_in_the_accounting_system_date']
        : invoice_reflection_in_the_accounting_system_date });
    };

    const handleSubmit = () => {
        setEntries([...entries, inputValues]);
        setInputValues({
            company: '',
            year: '',
            invoice_number: '',
            invoice_position: '',
            service_id: '',
            contract_id: '',
            invoice_reflection_in_the_accounting_system_date: new Date(),
            cost_excluding_VAT: ''
        });
    };

    const handleDelete = (index) => {
        const newEntries = entries.filter((_, i) => i !== index);
        setEntries(newEntries);
    };

    const handleEdit = (index, entry) => {
        const nextEntries = entries.map((c, i) => {
            if (i === index) {
                return entry;
            } else {
                return c;
            }
        });
        setEntries(nextEntries);
    };

    const handleSaveImportEntries = (jsonData) => {
        setEntries(entries => [...entries, ...jsonData]);
    };

    const handleLaunchDistribution = () => {
      // пустышка
    };

    const handleSaveDistribution = () => {
      // пустышка
    };

    return (

        <div>
            <div className="nav">
                {Object.keys(sections).map((section) => (
                    <a href="#" key={section} onClick={() => { setActiveSection(section); setActiveSubsection(''); }}>
                        {sections[section]}
                    </a>
                ))}
                <div className="auth-buttons">
                  <button class="auth" onClick={toggleLoginModal}>Авторизация</button>
                  <button class="auth" onClick={toggleRegisterModal}>Регистрация</button>
                </div>
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
                            handleEdit={handleEdit}
                            handleSaveImportEntries={handleSaveImportEntries}
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
            <LoginModal isOpen={isLoginModalOpen} toggle={toggleLoginModal} />
            <RegisterModal isOpen={isRegisterModalOpen} toggle={toggleRegisterModal} />
        </div>
    );
}

export default App;
