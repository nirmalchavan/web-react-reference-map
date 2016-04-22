const fs = require('fs');

/*
 * mock call to the credit card service
 */
const fnGetCreditCards = (req, res) => {
    console.log('inside fnGetCreditCards');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const creditCardJson = JSON.parse(fs.readFileSync(`${__dirname}/test/mock/creditcards.json`, 'utf8'));
    res.status(200).send(JSON.stringify(creditCardJson, null, 3));
};


/*
 * mock call to the header service
 */
const fnGetHeaders = (req, res) => {
    console.log('inside fnGetHeaders');
    const searchId = req.query.id;
    const listResults = JSON.parse(fs.readFileSync(`${__dirname}/test/mock/header.json`, 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const myHeaderJson = {};
    myHeaderJson[searchId] = listResults[searchId];
    res.status(200).send(JSON.stringify(myHeaderJson, null, 3));
};


/*
 * mock call to the order service
 */
const fnGetOrders = (req, res) => {
    console.log('inside fnGetOrders');
    const orderJson = JSON.parse(fs.readFileSync(`${__dirname}/test/mock/orderStatusSummary.json`, 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(orderJson, null, 3));
};


/*
 * mock call to the prescription service
 */
const fnGetPrescriptions = (req, res) => {
    console.log('inside fnGetPrescriptions');
    const prescriptionJson = JSON.parse(fs.readFileSync(`${__dirname}/test/mock/prescriptions.json`, 'utf8'));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(prescriptionJson, null, 3));
};


/*
 * mock call to AuthAppService
 * always succeeds
 */
const fnSimulateLogInSuccess = (req, res) => {
    console.log('inside fnSimulateLogIn');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(204).send({});
};


/*
 * mock call to a roles service
 */
const fnGetRoles = (req, res) => {
    console.log('inside fnGetRoles');
    const roleJson = { list: [{ role: 'role-1' }, { role: 'role-2' }, { role: 'role-3' }] };
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(JSON.stringify(roleJson, null, 3));
};


module.exports = {
    environment: {
        local: {
            '/api/auth/3/'      : { host: 'https://bookybooks-ref-dev.express-scripts.com', appendPath: true },
            '/api/creditCards'  : { host: 'http://localhost:8000', appendPath: true },
            '/api/header'       : { host: 'http://localhost:8000/api/header?id=ESImenu', appendPath: false },
            '/api/orders'       : { host: 'http://localhost:8000', appendPath: true },
            '/api/prescriptions': { host: 'http://localhost:8000', appendPath: true },
            '/api/roles'        : { func: fnGetRoles }
        },
        nightwatch_test: {
            '/api/auth/3/'      : { func: fnSimulateLogInSuccess },
            '/api/creditCards'  : { func: fnGetCreditCards },
            '/api/header'       : { func: fnGetHeaders },
            '/api/orders'       : { func: fnGetOrders },
            '/api/prescriptions': { func: fnGetPrescriptions },
            '/api/roles'        : { func: fnGetRoles }
        }
    }
};

