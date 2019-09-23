const buildWindowParams = (params) => {
    let defaultParams = {
        resizable: 'yes',
        location: 'no',
        status: 'no',
        scrollbars: 'no',
        toolbar: 'no',
        menubar: 'no',
    };

    return Object.keys({...defaultParams, ...params}).reduce((res, paramName) => `${res},${paramName}=${params[paramName]}`, '').slice(1);
}

export default buildWindowParams;
