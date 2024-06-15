import React, {useCallback, useState} from 'react';
import {useDropzone} from "react-dropzone";
import * as xlsx from "xlsx";

const MyDropzone = ({handleSaveImportEntries}) => {
    const headers = ["company", "year", "invoice_number", "invoice_position", "service_id", "contract_id", "invoice_reflection_in_the_accounting_system_date", "cost_excluding_VAT"];
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, {type: 'binary', cellDates:true, dateNF:'yyyy-mm-dd'});

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            let jsonData = xlsx.utils.sheet_to_json(sheet, { header: headers, raw: false, defval: null});

            if (jsonData[0].company === "Компания"){
                jsonData = jsonData.slice(1);
            }
            console.log(jsonData);
            handleSaveImportEntries(jsonData);
        };
        reader.readAsBinaryString(file);
    }, []);

    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div>
                {file.name}
            </div>
        </div>
    ));

    return (
        <section className="container" style={{margin: '0', padding: '0'}}>
            <div {...getRootProps({className: "dropzone"})}>
                <input {...getInputProps()} />
                <p>Переместите файл сюда или кликните и выберите файл</p>
            </div>
            <aside>
                {thumbs}
            </aside>
        </section>
    );
};

export default MyDropzone;
