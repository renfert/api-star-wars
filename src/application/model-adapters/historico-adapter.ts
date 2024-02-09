
import { IPlanetQuery } from 'src/infraestruture/interfaces/response-query-interface';
import HistoricoQuery from 'src/infraestruture/repositories/historico-query';
import {  IPlanet } from '../interfaces/historico-interface';
import { IPlanetMethod } from '../interfaces/response-controller-interface';

class HistoricoAdapter implements IPlanetMethod {

    private historicoQuery: IPlanetQuery;

    constructor(){
        this.historicoQuery = new HistoricoQuery();
    }

    public async getPlanet(planetId: number) {
        const query = await this.historicoQuery.getPlanet(planetId);

        if(!query.Item)
            return null;
        return query.Item;
        return query.Item.historico.L.map(item => {
            const { name, climate, diameter, gravity,orbital_period,population,residents, rotation_period, surface_water } = item.M;
            return {
                nombre: name.S,
                clima: climate.S,
                diametro: diameter.N,
                gravedad: gravity.N,
                periodo_orbital: orbital_period.N,
                poblacion : population.N,
                residentes: residents,
                periodo_rotacion : rotation_period,
                superficie_agua: surface_water,
                terrain: 'terreno',
                url: 'url',
                created: 'creado',
                edited: 'editado',
                films: 'peliculas'
               
            }
        });
    }

    public async savePlanet(planetId: number, planet: IPlanet): Promise<void>{
        await this.historicoQuery.savePlanet(planetId, planet);
    }

}

export default HistoricoAdapter