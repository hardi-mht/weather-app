import React, { useContext } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '../../Context/GlobalState';

toast.configure();

function ToastDisplay() {
    const notify = () => {
        toast.error(errorMsg, {
            toastId: 'customId'
        });
        resetError();
    };
    // Component to diplay error toast
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { errorMsg, resetError } = useContext(GlobalContext);
    // console.log(errorMsg,"in errooro")
    errorMsg !== '' ? notify() : <></>;
    return <></>;
}

export default ToastDisplay;
