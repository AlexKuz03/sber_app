import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import MyDropzone from './MyDropzone';
import ru from 'date-fns/locale/ru';
import DatePicker from "react-datepicker";
import EditingInvoices from "./EditingInvoices";
import AddAndEditBuildings from "./AddAndEditBuildings";
import EditingBuildings from "./EditingBuildings";

const DistributionObjects = ({  activeSubsection,
                                setActiveSubsection,
                                subsections,
                                buildings,
                                setBuildings,
                                handleLoadBuildings,
                                fixedAssets,
                                setFixedAssets,
                                handleLoadFixedAssets,
                                services,
                                setServices,
                                handleLoadServices,
                                contracts,
                                setContracts,
                                handleLoadContracts,
                                inputBuildings,
                                handleInputChangeBuilding,
                                handleSubmitBuildings,
                                handleEditBuildings,
                                handleDateChangeBuildings,
                                handleDeleteBuildings
                              }) => {

    const handleBack = () => {
        if (activeSubsection === 'buildings') {
            setBuildings([]);
        } else if (activeSubsection === 'fixed-assets') {
            setFixedAssets([]);
        } else if (activeSubsection === 'services') {
            setServices([]);
        } else if (activeSubsection === 'contracts') {
            setContracts([]);
        }
        setActiveSubsection('');
    };

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
                    <button onClick={handleBack}>Назад</button>
                    {activeSubsection === 'buildings' && (
                        <div>
                        <div>
                            Введите значения
                            <AddAndEditBuildings
                                inputBuildings={inputBuildings}
                                handleInputChangeBuilding={handleInputChangeBuilding}
                                handleDateChangeBuildings={handleDateChangeBuildings}>
                            </AddAndEditBuildings>
                            <button className="save-button" onClick={handleSubmitBuildings}>Добавить здание</button>
                        </div>
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
                                        <th>Удаление</th>
                                        <th>Редактирование</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {buildings.map((entry, index) => (
                                        <tr key={index}>
                                            {Object.keys(entry).map((key) => (
                                                key !== 'id' && (
                                                    <td key={key}>
                                                        {key === 'possession_beginning_date'
                                                        || key === 'possession_ending_date'
                                                        || key === 'measurement_ending_date'
                                                        || key === 'measurement_beginning_date'
                                                            ? new Date(entry[key]).toLocaleDateString()
                                                            : key === 'square' ? Number(entry[key])
                                                            : entry[key]}
                                                    </td>
                                                )
                                            ))}
                                            <td>
                                                <button className="delete-button" onClick={() => handleDeleteBuildings(index)}>Удалить</button>
                                            </td>
                                            <td>
                                                <EditingBuildings
                                                    values={entry}
                                                    handleDateChangeBuildings={handleDateChangeBuildings}
                                                    handleEditBuildings={handleEditBuildings}
                                                    index={index}>
                                                </EditingBuildings>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='load' onClick={handleLoadBuildings}>Загрузить справочник зданий</button>
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
                                {fixedAssets.map((entry, index) => (
                                    <tr key={index}>
                                        {Object.keys(entry).map((key) => (
                                            key !== 'id' && (
                                                <td key={key}>
                                                    {key === 'connection_with_building_beginning_date'
                                                    || key === 'connection_with_building_ending_date'
                                                    || key === 'place_in_service_date'
                                                    || key === 'disposal_date'
                                                        ? new Date(entry[key]).toLocaleDateString()
                                                        : (key === 'is_used_in_main_activity' || key === 'is_used_in_rent')
                                                        ? (entry[key] ? "X" : "")
                                                        : entry[key]}
                                                </td>
                                            )
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button className='load' onClick={handleLoadFixedAssets}>Загрузить справочник основных средств</button>
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
                                {services.map((entry, index) => (
                                    <tr key={index}>
                                        {Object.keys(entry).map((key) => (
                                            key !== 'id' && (
                                                <td key={key}>
                                                    {entry[key]}
                                                </td>
                                            )
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button className='load' onClick={handleLoadServices}>Загрузить справочник услуг</button>
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
                                {contracts.map((entry, index) => (
                                    <tr key={index}>
                                        {Object.keys(entry).map((key) => (
                                            key !== 'id' && (
                                                <td key={key}>
                                                    {key === 'contract_beginning_date'
                                                    || key === 'contract_ending_date'
                                                        ? new Date(entry[key]).toLocaleDateString()
                                                        : entry[key]}
                                                </td>
                                            )
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button className='load' onClick={handleLoadContracts}>Загрузить справочник договоров</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DistributionObjects;
