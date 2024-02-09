import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { IPlanet } from "src/application/interfaces/historico-interface";

export interface IPlanetQuery {
    getPlanet: (planetId: number) => Promise<GetItemCommandOutput>;
    savePlanet: (planetId: number, sueldos: IPlanet)
        => Promise<void>;
}