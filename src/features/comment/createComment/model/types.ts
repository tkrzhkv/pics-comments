import type { AxiosError, AxiosResponse } from "axios";

interface CustomErrorResponseData {
	message: string;
}

export interface ErrorType extends AxiosError<CustomErrorResponseData> {
	response?: AxiosResponse<CustomErrorResponseData>;
}
