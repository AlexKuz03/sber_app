import DatePicker from "react-datepicker";
import React from "react";
import ru from 'date-fns/locale/ru';

const AddAndEditBuildings = ({inputBuildings, handleInputChangeBuilding, handleDateChangeBuildings}) => {
    return (
        <table className="custom-table">
            <thead>
            <tr>
                <th>Здание</th>
                <th>Начало владения</th>
                <th>Конец владения</th>
                <th>Измерение действит. по</th>
                <th>Измерение действ. с</th>
                <th>Площадь</th>
                <th>Единица измерения</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <input
                        type="text"
                        name="building_id"
                        value={inputBuildings.building_id}
                        onChange={handleInputChangeBuilding}
                    />
                </td>
                <td>
                    <DatePicker
                        selected={inputBuildings.possession_beginning_date}
                        onChange={(date) => handleDateChangeBuildings(date)}
                        dateFormat="dd-MM-yyyy"
                        locale={ru}
                        wrapperClassName="width-date-picker"
                    />
                </td>
                <td>
                    <DatePicker
                        selected={inputBuildings.possession_ending_date}
                        onChange={(date) => handleDateChangeBuildings(date)}
                        dateFormat="dd-MM-yyyy"
                        locale={ru}
                        wrapperClassName="width-date-picker"
                    />
                </td>
                <td>
                    <DatePicker
                        selected={inputBuildings.measurement_ending_date}
                        onChange={(date) => handleDateChangeBuildings(date)}
                        dateFormat="dd-MM-yyyy"
                        locale={ru}
                        wrapperClassName="width-date-picker"
                    />
                </td>
                <td>
                    <DatePicker
                        selected={inputBuildings.measurement_beginning_date}
                        onChange={(date) => handleDateChangeBuildings(date)}
                        dateFormat="dd-MM-yyyy"
                        locale={ru}
                        wrapperClassName="width-date-picker"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="square"
                        value={inputBuildings.square}
                        onChange={handleInputChangeBuilding}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        name="measure_unit"
                        value={inputBuildings.measure_unit}
                        onChange={handleInputChangeBuilding}
                    />
                </td>
            </tr>
            </tbody>
        </table>
    )
}
export default AddAndEditBuildings;
