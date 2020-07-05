import Noty from 'noty';
const AlertSuccess = (message) => {
    new Noty({
        type: 'success',
        layout: 'topRight',
        text: message
    }).show();
}

const AlertError = (message) => {
    new Noty({
        type: 'error',
        layout: 'topRight',
        text: message
    }).show();
}
export { AlertError, AlertSuccess };
