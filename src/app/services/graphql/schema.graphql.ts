import { buildSchema } from 'graphql';

export const Schema = buildSchema(`
    type Brand {
        id: Int
        name: String
        logo: String
        banner: String
        updated_at: String
    }
    type Outlet {
        id: Int
        brand_id: Int
        name: String
        picture: String
        address: String
        longitude: String
        latitude: String
        distance: Float
        updated_at: String
    }
    type Product {
        id: Int
        brand_id: Int
        name: String
        picture: String
        price: Float
        created_at: String
        updated_at: String
    }
    type ProductTotal {
        total: Int
    }

    input BrandInput {
        name: String
        logo: String
        banner: String
    }

    input OutletInput {
        brand_id: Int
        name: String
        picture: String
        address: String
        longitude: String
        latitude: String
    }

    input ProductInput {
        brand_id: Int
        name: String
        picture: String
        price: Float
    }

    type Query {
        brands: [Brand]
        brand(id: Int!): Brand

        outlets: [Outlet]
        outlet(id: Int!): Outlet
        outletBrand(id: Int!): [Outlet]

        products: [Product]
        product(id: Int!): Product
        productBrand(id: Int!): [Product]
        productTotal: ProductTotal
        productTotalBrand(id: Int!): ProductTotal
    }
    
    type Mutation {
        addBrand(input: BrandInput!): Boolean
        updateBrand(id: Int!, input: BrandInput!): Boolean
        deleteBrand(id: Int!): Boolean
        
        addOutlet(input: OutletInput!): Boolean
        updateOutlet(id: Int!, input: OutletInput!): Boolean
        deleteOutlet(id: Int!): Boolean
        
        addProduct(input: ProductInput!): Boolean
        updateProduct(id: Int!, input: ProductInput!): Boolean
        deleteProduct(id: Int!): Boolean
    }
`);
