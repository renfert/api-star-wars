import { AttributeValue, GetItemCommand, GetItemCommandInput, GetItemCommandOutput, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import {  IPlanet } from "src/application/interfaces/historico-interface";
import { IPlanetQuery } from "../interfaces/response-query-interface";
import DynamoConnection from "./DynamoConnection";
import { dirname } from "path";

const TableName = 'planets-star-wars';
class HistoricoQuery implements IPlanetQuery {

    public constructor(){
    }

    public async getPlanet (planetId: number): Promise<GetItemCommandOutput> {

        const input: GetItemCommandInput = {
            TableName,
            Key: {
                planetId: {
                    N: ""+planetId
                }
            }
        }

        const command = new GetItemCommand(input);
        const result = await DynamoConnection.send(command);

        return result;
    }

    public async savePlanet (planetId: number, planet: IPlanet): Promise<void>{
        let tmp = []

        const valor: AttributeValue = {
            M: {
                updated: {
                    S: (new Date()).toString()
                }, 
                nombre: {
                    S: ""+planet.name
                },
                climate: {
                    S: ""+planet.climate
                },
                diameter: {
                    N: ""+planet.diameter
                },
                gravity: {
                    S: ""+planet.gravity
                },
                orbital_period: {
                    N: ""+planet.orbital_period
                },
                population: {
                    N: ""+planet.population
                },
                rotation_period: {
                    N: ""+planet.rotation_period
                },
                surface_water: {
                    N: ""+planet.surface_water
                },
                terrain: {
                    S: ""+planet.terrain
                }
                
                
            }
        }

        tmp.push(valor)
        const input: PutItemCommandInput = {
            TableName,
            Item: {
                planetId: {
                    N: ""+planetId,
                },
                data: {
                    L: tmp
                }
            }
        }

        const command = new PutItemCommand(input);
        await DynamoConnection.send(command);

    }

}

export default HistoricoQuery;