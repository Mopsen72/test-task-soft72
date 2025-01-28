import {axiosAppInstance} from "../../shared/utils/axiosInit.ts";
import type {AxiosResponse} from "axios";
import type {IBookGoogleAPI} from "./types.d.ts";

export interface IGoogleAPIResponse {
    kind: string,
    items: IBookGoogleAPI[],
    totalItems: number
}

export const useBooksRepository = () => {
    const getBooks = async (page: number, search?: string): Promise<AxiosResponse<IGoogleAPIResponse>> => {

        return await axiosAppInstance.get("/volumes", {
            params: {
                q: search ? search : "a", //обязательный параметр в API, потому хотя бы какую-нибудь строку отаправить надо
                maxResults: 10,
                startIndex: (page - 1) * 10
            }
        })

    }

    const getBookById = async (id: string): Promise<AxiosResponse<IBookGoogleAPI>> => {

        return await axiosAppInstance.get(`/volumes/${id}`)

    }

    return {getBooks, getBookById}
}