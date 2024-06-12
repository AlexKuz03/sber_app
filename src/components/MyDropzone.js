import React, { useState } from 'react';
import { useDropzone } from "react-dropzone";

const MyDropzone = () => {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div>
                {file.name}
            </div>
        </div>
    ));

    return (
        <section className="container" style={{margin:'0', padding:'0'}}>
            <div {...getRootProps({ className: "dropzone" })}>
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
