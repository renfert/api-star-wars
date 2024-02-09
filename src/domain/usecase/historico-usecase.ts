import { StatusCodes } from "http-status-codes";
import HttpError from "src/application/exceptions/http-error";
import {  IPlanet } from "src/application/interfaces/historico-interface";
import { IPlanetMethod } from "src/application/interfaces/response-controller-interface";
import HistoricoAdapter from "src/application/model-adapters/historico-adapter";

export default class HistoricoUseCase implements IPlanetMethod {

    private historicoAdapter: IPlanetMethod;

    constructor(){
        this.historicoAdapter = new HistoricoAdapter()
    }

    public async getPlanet (planetId: number){

        const result = await this.historicoAdapter.getPlanet(planetId);

        if(result == null || result === undefined)
            throw new HttpError("El planeta no existe", StatusCodes.NOT_FOUND);

        return result;

    }

    public async savePlanet(planetId: number, planet: IPlanet): Promise<void>{
        await this.historicoAdapter.savePlanet(planetId, planet);
    }

}