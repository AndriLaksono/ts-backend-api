import haversineDistance from 'haversine-distance';
import { OutletInterfaceFull, OutletInterfaceFullWithDistance } from '../services/outlet/services.outlet';

interface BaseInterface {
    lat: number;
    lng: number;
}

export class HaversineFormula {
    /**
     * Return list of data with distance and Sort by distance closest to Base
     * @param base base location
     * @param data list of data
     */
    distanceOutletList = (
        base: BaseInterface,
        data: Array<OutletInterfaceFull>,
    ): Array<OutletInterfaceFullWithDistance> => {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const el = data[i];

            // return in meter
            const distance = haversineDistance(base, { lat: +el.latitude, lng: +el.longitude });

            result[i] = {
                ...el,
                distance: Math.round((distance / 1000) * 100) / 100,
            };
        }

        return result.sort((a, b) => a.distance - b.distance);
    };

    /**
     * Return object data with distance from base
     * @param base base location
     * @param data object data
     */
    distanceOutlet = (base: BaseInterface, data: OutletInterfaceFull): OutletInterfaceFullWithDistance => {
        const distance = haversineDistance(base, { lat: +data.latitude, lng: +data.longitude });
        return {
            ...data,
            distance: Math.round((distance / 1000) * 100) / 100,
        };
    };
}
