import React, {useState} from 'react';
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
import ErrorModal from './components/ErrorModal';
import ErrorBoundary from './components/ErrorBoundary';
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

    const [distributionData, setDistributionData] = useState([]);
    const [historyDistributionData, setHistoryDistributionData] = useState([]);

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
        const {name, value} = event.target;
        const newValue = name === 'cost_excluding_VAT' ? value.replace(',' , '.') : value;
        setInputValues({ ...inputValues, [name]: newValue });
    };

    const handleDateChange = (invoice_reflection_in_the_accounting_system_date) => {
        setInputValues({
            ...inputValues,
            ['invoice_reflection_in_the_accounting_system_date']: invoice_reflection_in_the_accounting_system_date
        });
    };

    const handleSubmit = () => {
        setIsLoading(true);
        const requiredFields = [
            'company', 'year', 'invoice_number', 'invoice_position',
            'service_id', 'contract_id', 'invoice_reflection_in_the_accounting_system_date',
            'cost_excluding_VAT'
        ];

        const emptyFields = requiredFields.filter(field => !inputValues[field]);

        if (emptyFields.length > 0) {
            showError('Все поля должны быть заполнены');
            setIsLoading(false);
            return;
        }

        const formattedValue = inputValues.cost_excluding_VAT.replace(',' , '.');
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
        setIsLoading(false);
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
        setIsLoading(true);
        fetch('https://task11-p2js.onrender.com/api/invoice_for_payment/upload_json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entries)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            setDistributionData(data);
            setActiveSection('distribution-management');
            setIsLoading(false);
        })
        .catch((err) => {
            showError('Ошибка при загрузке данных для распределения: ' + err.message);
            console.error('Ошибка при загрузке данных для распределения: ', err);
            setIsLoading(false);
        })
    };

    const handleSaveDistribution = () => {
        setIsLoading(true);
        fetch('https://task11-p2js.onrender.com/api/distributed_invoice_for_payment/upload_json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(distributionData)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
                setIsLoading(false);
            });
    };

    const handleLoadHistory = () => {
        setIsLoading(true);
        fetch('https://task11-p2js.onrender.com/api/distributed_invoice_for_payment/', {
            method: 'GET',
            headers: {
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setHistoryDistributionData(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
                setIsLoading(false);
            });
    };

    const handleSaveInFile = () => {

    };

    const handleInputChangeDistribution = (event) => {
        const {name, value} = event.target;
        setInputValues({...distributionValues, [name]: value});
    };

    const handleDateChangeDistribution = (invoice_reflection_in_the_accounting_system_date) => {
        setDistributionValues({
            ...distributionValues,
            ['invoice_reflection_in_the_accounting_system_date']: invoice_reflection_in_the_accounting_system_date
        });
    };

    const handleSubmitDistribution = () => {
        setIsLoading(true);
        setDistributionData([...distributionData, distributionValues]);
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
        setIsLoading(false);
    };

    const handleDeleteDistribution = (index) => {
        const newData = distributionData.filter((_, i) => i !== index);
        setDistributionData(newData);
    };

    const handleEditDistribution = (index, isdata) => {
        const nextData = distributionData.map((c, i) => {
            if (i === index) {
                return isdata;
            } else {
                return c;
            }
        });
        setDistributionData(nextData);
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
        setIsLoading(true);
        setFinal([...final, finishedValues]);
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
        setIsLoading(false);
    };

    //отлов ошибок

    const [error, setError] = useState({isOpen: false, message: ''});

    const showError = (message) => {
        setError({isOpen: true, message});
        setTimeout(() => {
            setError({isOpen: false, message: ''});
        }, 600000);
    };

    const [isLoading, setIsLoading] = useState(false);

    return (

        <div>
          {isLoading && (
              <div className="loading-overlay">
                  <p>Загрузка. Пожалуйста, ожидайте..</p>
              <div className="spinner"></div>
                  </div>
          )}
          <ErrorBoundary>
            <div className="nav">
                {Object.keys(sections).map((section) => (
                    <a href="#" key={section} onClick={() => {
                        setActiveSection(section);
                        setActiveSubsection('');
                    }}>
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
                            historyDistributionData={historyDistributionData}
                        />
                    )}
                    {activeSection === 'launch-distribution' && (
                        <LaunchDistribution entries={entries} handleLaunchDistribution={handleLaunchDistribution}/>
                    )}
                    {activeSection === 'distribution-management' && (
                        <DistributionManagement
                            handleSaveDistribution={handleSaveDistribution}
                            data={distributionData}
                            handleDeleteDistribution={handleDeleteDistribution}
                            EditingDistributionManagement={EditingDistributionManagement}
                            handleDateChangeDistribution={handleDateChangeDistribution}
                            handleEditDistribution={handleEditDistribution}
                            handleSaveInFile={handleSaveInFile}
                        />
                    )}
                    {activeSection === 'cost-forecasting' && (
                        <CostForecasting/>
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
            <LoginModal isOpen={isLoginModalOpen} toggle={toggleLoginModal}/>
            <RegisterModal isOpen={isRegisterModalOpen} toggle={toggleRegisterModal}/>
            <ErrorModal isOpen={error.isOpen} toggle={() => setError({isOpen: false, message: ''})}
                        errorMessage={error.message}/>
            </ErrorBoundary>
        </div>
    );
}

export default App;
