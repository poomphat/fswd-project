import { ProductTC } from '../../models/product'
import { GraphQLUpload } from 'graphql-upload';
import { schemaComposer } from 'graphql-compose'


export const createProduct = ProductTC.getResolver('createOne')
export const findProductById = ProductTC.getResolver('findById')
export const findManyProduct = ProductTC.getResolver('findMany')
export const updateProductById = ProductTC.getResolver('updateById')
export const removeProductById = ProductTC.getResolver('removeById')
export const countProduct = ProductTC.getResolver('count')

schemaComposer.add(GraphQLUpload);

const Addproduct = schemaComposer.createObjectTC({
    name: 'addproduct',
    fields: {
        productName: 'String',
        productDesc: 'String',
        catagory: 'String',
        price: 'Float',
        imgUrl: 'Upload',
        genderType: 'String',
    },
  })


schemaComposer.Mutation.addFields({
    createProductImg: {
      type: Addproduct,
      args: {
        productName: 'String',
        productDesc: 'String',
        catagory: 'String',
        price: 'Float',
        imgUrl: '[Upload]',
        genderType: 'String',
      },
      resolve: async ({ args }) => {
        const newproduct = { args };
        return newproduct;
      },
    },
  }); 