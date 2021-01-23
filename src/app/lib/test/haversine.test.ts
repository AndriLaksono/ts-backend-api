import { HaversineFormula } from '../haversine';
import { base } from '../../services/outlet/controller.outlet';

const haversine = new HaversineFormula();

describe('UNIT TEST', () => {
    test('Distance Outlet', () => {
        expect(
            haversine.distanceOutlet(base, {
                id: 1,
                brand_id: 1,
                name: 'KFC Kemang',
                picture: 'kfc-kemang.jpg',
                address: 'Jl. Kemang Raya No.14A, RT.11/RW.1',
                longitude: '106.8062524',
                latitude: '-6.2558218',
            }),
        ).toBeTruthy();
    });

    test('Distance Outlet List', () => {
        expect(
            haversine.distanceOutletList(base, [
                {
                    id: 1,
                    brand_id: 1,
                    name: 'KFC Kemang',
                    picture: 'kfc-kemang.jpg',
                    address: 'Jl. Kemang Raya No.14A, RT.11/RW.1',
                    longitude: '106.8062524',
                    latitude: '-6.2558218',
                },
            ]),
        ).toBeTruthy();
    });
});
