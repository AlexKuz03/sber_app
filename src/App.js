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
        inputValues.invoice_reflection_in_the_accounting_system_date = inputValues.invoice_reflection_in_the_accounting_system_date.toISOString().substring(0, 10);
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
        console.log(entries);
    };

    const handleDelete = (index) => {
        const newEntries = entries.filter((_, i) => i !== index);
        setEntries(newEntries);
    };

    const handleEdit = (index, entry) => {
        entry.invoice_reflection_in_the_accounting_system_date = entry.invoice_reflection_in_the_accounting_system_date.toISOString().substring(0, 10);
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
        fetch('/server/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: entries
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // Handle data
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleSaveDistribution = () => {
      // сохранение распределения после редактирования
    };

    const handleLoadHistory = () =>{
      // сохранение распределенного счета на оплату в БД
    };

    const [distributionValues, setDistributionValues] = useState({
        company: '',
        year: '',
        invoice_number: '',
        invoice_position: '',
        distribution_position_number: '',
        reflection_in_the_accounting_system_date: new Date(),
        contract_id: '',
        service_id: '',
        service_class: '',
        building_id: '',
        fixed_asset_class: '',
        fixed_asset_id: '',
        is_used_in_main_activity: '',
        is_used_in_rent: '',
        square: '',
        distribution_sum: '',
        general_ledger_account: ''
    });

    const [data, setData] = useState([]);

    const handleSaveInFile = () => {
      // сохранение в файл
    };

    const handleInputChangeDistribution = (event) => {
        const { name, value } = event.target;
        setInputValues({ ...distributionValues, [name]: value });
    };

    const handleDateChangeDistribution = (invoice_reflection_in_the_accounting_system_date) => {
        setDistributionValues({ ...distributionValues, ['invoice_reflection_in_the_accounting_system_date']
        : invoice_reflection_in_the_accounting_system_date });
    };

    const handleSubmitDistribution = () => {
        setData([...data, distributionValues]);
        setDistributionValues({
          company: '',
          year: '',
          invoice_number: '',
          invoice_position: '',
          distribution_position_number: '',
          reflection_in_the_accounting_system_date: new Date(),
          contract_id: '',
          service_id: '',
          service_class: '',
          building_id: '',
          fixed_asset_class: '',
          fixed_asset_id: '',
          is_used_in_main_activity: '',
          is_used_in_rent: '',
          square: '',
          distribution_sum: '',
          general_ledger_account: ''
        });
    };

    const handleDeleteDistribution = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    const handleEditDistribution = (index, isdata) => {
        const nextData = data.map((c, i) => {
            if (i === index) {
                return isdata;
            } else {
                return c;
            }
        });
        setData(nextData);
    };

    const [finishedValues, setFinishedValues] = useState({
        company: '',
        year: '',
        invoice_number: '',
        invoice_position: '',
        distribution_position_number: '',
        reflection_in_the_accounting_system_date: new Date(),
        contract_id: '',
        service_id: '',
        service_class: '',
        building_id: '',
        fixed_asset_class: '',
        fixed_asset_id: '',
        is_used_in_main_activity: '',
        is_used_in_rent: '',
        square: '',
        distribution_sum: '',
        general_ledger_account: ''
    });

    const [final, setFinal] = useState([]);

    const handleSubmitFinal = () => {
        setFinal([...data, finishedValues]);
        setFinishedValues({
          company: '',
          year: '',
          invoice_number: '',
          invoice_position: '',
          distribution_position_number: '',
          reflection_in_the_accounting_system_date: new Date(),
          contract_id: '',
          service_id: '',
          service_class: '',
          building_id: '',
          fixed_asset_class: '',
          fixed_asset_id: '',
          is_used_in_main_activity: '',
          is_used_in_rent: '',
          square: '',
          distribution_sum: '',
          general_ledger_account: ''
        });
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
                        <DistributedInvoices
                            handleLoadHistory={handleLoadHistory}
                            handleSubmitFinal={handleSubmitFinal}
                        />
                    )}
                    {activeSection === 'launch-distribution' && (
                        <LaunchDistribution entries={entries} />
                    )}
                    {activeSection === 'distribution-management' && (
                      <DistributionManagement
                          handleSaveDistribution={handleSaveDistribution}
                          data={data}
                          handleDeleteDistribution={handleDeleteDistribution}
                          EditingDistributionManagement={EditingDistributionManagement}
                          handleDateChangeDistribution={handleDateChangeDistribution}
                          handleEditDistribution={handleEditDistribution}
                          handleSaveInFile={handleSaveInFile}
                      />
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
