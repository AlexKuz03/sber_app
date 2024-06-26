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

    const [inputBuildings, setInputBuildings] = useState({
        building_id: '',
        possession_beginning_date: new Date(),
        possession_ending_date: new Date(),
        measurement_ending_date: new Date(),
        measurement_beginning_date: new Date(),
        square: '',
        measure_unit: ''
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
        'fixed-assets': 'Ведение справочника основных средств',
        'services': 'Ведение справочника работ/услуг',
        'contracts': 'Ведение справочника договоров'
    };

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        const newValue = name === 'cost_excluding_VAT' ? value.replace(/,/g, '.').replace(/\s/g, '') : value;
        setInputValues({...inputValues, [name]: newValue});
    };

    const handleInputChangeBuildings = (event) => {
        const {name, value} = event.target;
        setInputBuildings({...inputBuildings, [name]: value});
    };

    const handleDateChange = (invoice_reflection_in_the_accounting_system_date) => {
        setInputValues({
            ...inputValues,
            ['invoice_reflection_in_the_accounting_system_date']: invoice_reflection_in_the_accounting_system_date
        });
    };

    const handleDateChangeBuildings = ( possession_beginning_date,
                                        possession_ending_date,
                                        measurement_ending_date,
                                        measurement_beginning_date) => {
          setInputBuildings({
            ...inputBuildings,
            ['possession_beginning_date']: possession_beginning_date,
            ['possession_ending_date']: possession_ending_date,
            ['measurement_ending_date']: measurement_ending_date,
            ['measurement_beginning_date']: measurement_beginning_date
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

    const handleDelete = (index) => {
        const newEntries = entries.filter((_, i) => i !== index);
        setEntries(newEntries);
    };

    const [builds, setBuilds] = useState ([])

    const handleSubmitBuildings = () => {
        setIsLoading(true);
        const requiredFields = [
            'building_id', 'possession_beginning_date', 'possession_ending_date', 'measurement_ending_date',
            'measurement_beginning_date', 'square', 'measure_unit'
        ];

        const emptyFields = requiredFields.filter(field => !inputValues[field]);

        if (emptyFields.length > 0) {
            showError('Все поля должны быть заполнены');
            setIsLoading(false);
            return;
        }

        inputBuildings.possession_beginning_date =  inputBuildings.possession_beginning_date.toISOString().substring(0, 10);
        inputBuildings.possession_ending_date =  inputBuildings.possession_ending_date.toISOString().substring(0, 10);
        inputBuildings.measurement_ending_date =  inputBuildings.measurement_ending_date.toISOString().substring(0, 10);
        inputBuildings.measurement_beginning_date =  inputBuildings.measurement_beginning_date.toISOString().substring(0, 10);
        fetch('https://task11-p2js.onrender.com/api/building/upload_json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: '[' + JSON.stringify(inputBuildings) + ']'
        })
        setIsLoading(false);
    };

    const handleEditBuildings = () => {

    };

    const handleDeleteBuildings = () => {

    };

    const handleEditDist = (index, entry) => {
        const nextEntries = distributionData.map((c, i) => {
            if (i === index) {
                return entry;
            } else {
                return c;
            }
        });
        setDistributionData(nextEntries);
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
            headers: {}
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
        const rows = [[ "Компания",
                        "Год счета",
                        "Номер счета",
                        "Позиция счета",
                        "Номер позиции распределения",
                        "Дата отражения в учетной системе",
                        "ID договора",
                        "Услуга",
                        "ID услуги",
                        "Здание",
                        "Класс ОС",
                        "ID основного средства",
                        "Признак использования в основной деятель",
                        "Признак передачи в аренду",
                        "Площадь",
                        "Сумма распределения",
                        "Счет главной книги"],
            ...distributionData.map(item => [
                item.company,
                item.year,
                item.invoice_number,
                item.invoice_position,
                item.distribution_position_number,
                item.reflection_in_the_accounting_system_date,
                item.contract_id,
                item.service_id,
                item.service_class,
                item.building_id,
                item.fixed_asset_class,
                item.fixed_asset_id,
                item.is_used_in_main_activity,
                item.is_used_in_rent,
                item.square,
                item.distribution_sum,
                item.general_ledger_account
            ])
        ];
        let csvContent = "\uFEFF";

        rows.forEach(function (rowArray) {
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement("a");
        if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "distribution.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
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

    const handleDeleteDistribution = (index) => {
        const newData = distributionData.filter((_, i) => i !== index);
        setDistributionData(newData);
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

    const [buildings, setBuildings] = useState([]);

    const handleLoadBuildings = () => {
        setIsLoading(true);
        fetch('https://task11-p2js.onrender.com/api/building/', {
            method: 'GET',
            headers: {}
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setBuildings(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
                setIsLoading(false);
            });
    };

    const [fixedAssets, setFixedAssets] = useState([]);

    const handleLoadFixedAssets = () => {
        setIsLoading(true);
        fetch('https://task11-p2js.onrender.com/api/fixed_asset/', {
            method: 'GET',
            headers: {}
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setFixedAssets(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
                setIsLoading(false);
            });
    };

    const [services, setServices] = useState([]);

    const handleLoadServices = () => {
        setIsLoading(true);
        fetch('https://task11-p2js.onrender.com/api/service/', {
            method: 'GET',
            headers: {}
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setServices(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
                setIsLoading(false);
            });
    };

    const [contracts, setContracts] = useState([]);

    const handleLoadContracts = () => {
        setIsLoading(true);
        fetch('https://task11-p2js.onrender.com/api/contract/', {
            method: 'GET',
            headers: {}
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setContracts(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.message);
                setIsLoading(false);
            });
    };

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
                            setHistoryDistributionData([]);
                            setBuildings([]);
                            setFixedAssets([]);
                            setServices([]);
                            setContracts([]);
                        }}>
                            {sections[section]}
                        </a>
                    ))}
                    <div className="auth-buttons">
                        <button className="auth" onClick={toggleLoginModal}>Авторизация</button>
                        <button className="auth" onClick={toggleRegisterModal}>Регистрация</button>
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
                                setIsLoading={setIsLoading}
                            />
                        )}
                        {activeSection === 'distributed-invoices' && (
                            <DistributedInvoices
                                handleLoadHistory={handleLoadHistory}
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
                                handleDateChangeDistribution={handleDateChangeDistribution}
                                handleEditDistribution={handleEditDist}
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
                                buildings={buildings}
                                setBuildings={setBuildings}
                                handleLoadBuildings={handleLoadBuildings}
                                fixedAssets={fixedAssets}
                                setFixedAssets={setFixedAssets}
                                handleLoadFixedAssets={handleLoadFixedAssets}
                                services={services}
                                setServices={setServices}
                                handleLoadServices={handleLoadServices}
                                contracts={contracts}
                                setContracts={setContracts}
                                handleLoadContracts={handleLoadContracts}
                                inputBuildings={inputBuildings}
                                handleInputChangeBuildings={handleInputChangeBuildings}
                                handleDateChangeBuildings={handleDateChangeBuildings}
                                handleSubmitBuildings={handleSubmitBuildings}
                                builds={builds}
                                handleDeleteBuildings={handleDeleteBuildings}
                                handleEditBuildings={handleEditBuildings}
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
