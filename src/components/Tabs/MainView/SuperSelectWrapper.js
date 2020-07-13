import React from "react"
import ReactSuperSelect from 'react-super-select'

const SuperSelectWrapper = (props) => {
    const {customClass,  initialValue, placeholder, onChange, customOptionTemplate, dataSource} = props;
    return (
        <ReactSuperSelect
                customClass={customClass}
                initialValue={initialValue}
                placeholder={placeholder}
                onChange={onChange}
                customOptionTemplateFunction={customOptionTemplate} 
                dataSource={dataSource} />
    );
}

export default SuperSelectWrapper;