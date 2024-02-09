import { StatusCodes } from "http-status-codes";
import HistoricoUseCase from "src/domain/usecase/historico-usecase";
import { responseFail, responseSuccess } from "../helpers/response";
import {  IPlanet } from "../interfaces/historico-interface";
import axios from 'axios';
import { IPlanetApi, IPlanetMethod, IResponseApi } from "../interfaces/response-controller-interface"
import dictionaryTranslate from "../dictionaryTranslate";


class HistoricoController implements IPlanetApi {

    private historicoUseCase: IPlanetMethod;

    constructor(){
        this.historicoUseCase = new HistoricoUseCase()
    }

    private translateObjectProperties(obj: any): any {
        const translatedObject: any = {};
      
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const translatedKey = dictionaryTranslate[key] || key;
            translatedObject[translatedKey] = obj[key];
          }
        }
      
        return translatedObject;
      }
      
    

    private async  fetchDataSwapi(id) {
        
            try {
                
              const response = await axios.get('https://swapi.py4e.com/api/planets/'+id);
              let responseOnject =response.data
              responseOnject = this.translateObjectProperties(responseOnject)
                return responseOnject
            } catch (error) {
              console.error('Error fetchDataSwapi:', error.message);
            }
          
    }

    getPlanet = async (planetId: number) => {
       
        let response: IResponseApi;
        try {
            const swapiResult = await this.fetchDataSwapi(planetId)
            if(swapiResult !== undefined){
                response = responseSuccess(
                    { data: swapiResult },
                    StatusCodes.OK
                );
                return response;
            }
            const result= await this.historicoUseCase.getPlanet(planetId);
          
            response = responseSuccess(
                { data: result },
                StatusCodes.OK
            );
            
        } catch (error) {
            response = responseFail(error);
        }

        return response;
    
    }

    savePlanet = async (planetId: number, planet: IPlanet) => {

        let response: IResponseApi;

        try {

            await this.historicoUseCase.savePlanet(planetId, planet);
            response = responseSuccess({ message: "Planeta almacenado" }, StatusCodes.OK);
            
        } catch (error) {
            response = responseFail(error)
        }

        return response;

    }

}

export default HistoricoController;