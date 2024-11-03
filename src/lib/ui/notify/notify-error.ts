import { AxiosError } from 'axios';
import { Notify, QNotifyCreateOptions } from 'quasar';
type NotifyErrorProps = { error?: any; message?: string };

export function notifyError({ error, message }: NotifyErrorProps) {
    const errorBody: QNotifyCreateOptions = {
        type: 'negative',
        message: 'Erro ao realizar a operação.',
    };

    if (error instanceof AxiosError) {
        errorBody.message = getAxiosMessage(error);
    }

    if (message) errorBody.message = message;

    Notify.create(errorBody);

    function getAxiosMessage(error: any) {
        if (error.response?.status === 500) {
            return 'Erro interno de servidor. Tente novamente mais tarde.';
        }
        return error.response?.data.message;
    }
}
