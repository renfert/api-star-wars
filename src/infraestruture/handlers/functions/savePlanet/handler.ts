import 'source-map-support/register';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import Ajv from 'ajv';
import schema from './schema';
import { IResponseApi } from 'src/application/interfaces/response-controller-interface';
import HistoricoController from 'src/application/controllers/historico-controller';
import { IPlanet } from 'src/application/interfaces/historico-interface';

const historicoController = new HistoricoController();

const ajv = new Ajv();
const validate = ajv.compile(schema);

const savePlanet: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  // Validate the request body against the schema
  const isValid = validate(event.body);
  if (!isValid) {
    const validationErrors = validate.errors?.map((error) => (       
      { 
        instancePath: error.instancePath,     
        message: error.message,
    }));
    return formatJSONResponse(400, { message: "schema error", data: validationErrors, success:false });
  }

  let planet: IPlanet = {
    name: event.body.name as String,
    gravity: event.body.url as String,
    diameter: event.body.diameter as number,
    climate: event.body.climate as String,
    population: event.body.population as number,
    orbital_period: event.body.orbital_period as number,
    residents: event.body.residents as [string],
    rotation_period: event.body.rotation_period as number,
    url: event.body.url as String,
    surface_water: event.body.surface_water as number,
    terrain: event.body.terrain as String,
    created: new Date(),
    updated: new Date(),
  };

  const planetId = +event.pathParameters.planetId;

  const response: IResponseApi = await historicoController.savePlanet(
    planetId,
    planet
  );

  return formatJSONResponse(response.statusCode, response);
};

export const main = middyfy(savePlanet);
