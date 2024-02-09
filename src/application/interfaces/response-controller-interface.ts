import { StatusCodes } from "http-status-codes";
import {  IPlanet } from "./historico-interface";

export interface IResponseApi {
    statusCode: StatusCodes;
    success: boolean;
    data: any;
    message: string;
};

export interface IResponseBody {
    data?: any;
    message?: string;
}

export interface IPlanetMethod {
    getPlanet: (planetId: number) => Promise<Object>;
    savePlanet: (planetId: number, planet: IPlanet)
        => Promise<void>;
}

export interface IPlanetApi {
    getPlanet: (planetId: number) => Promise<IResponseApi>;
    savePlanet: (planetId: number, planet: IPlanet)
        => Promise<IResponseApi>
}