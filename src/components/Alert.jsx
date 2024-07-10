import React from "react";

function Alert(props) {
    const {name = '', closeAlert = Function.prototype } = props;

    React.useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000);

        return () => {
            clearTimeout(timerId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[name]);

    return (
        <div className="toast-container position-fixed p-3 top-0 start-50 translate-middle-x" style={{ top: '30%' }}>
            <div className="toast fade show bg-white rounded-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-body text-dark">
                    {name} добавлен в корзину
                </div>
            </div>
        </div>
    );
}

export { Alert };