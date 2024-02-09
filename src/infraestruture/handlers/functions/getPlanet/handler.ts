import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { IResponseApi } from 'src/application/interfaces/response-controller-interface';
import HistoricoController from 'src/application/controllers/historico-controller';

const historicoController = new HistoricoController()

const getPlanet: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {

  const response:IResponseApi = await historicoController.getPlanet(+event.pathParameters.planetId);

  return formatJSONResponse(response.statusCode, response);
}

export const main = middyfy(getPlanet);
