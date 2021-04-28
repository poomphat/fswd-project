import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import jwt from 'express-jwt'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { graphqlUploadExpress  } from 'graphql-upload'; 
import './mongoose-connect'
import schema from './graphql'
import { v4 as uuid } from 'uuid'
import { createWriteStream, unlink } from 'fs'


const app = express()



const uploadFile = async (file) => {
  const { createReadStream, filename } = await file
  const stream = createReadStream()
  const name = `${uuid()}.${filename.split('.').pop()}`
  const path = `${__dirname}/../public/${name}`
  
  await new Promise((resolve, reject) => {
    const writeStream = createWriteStream(path)
    writeStream.on('finish', resolve)
    writeStream.on('error', (error) => {
      unlink(path, () => {
        reject(error)
      })
    })
    stream.on('error', (error) => writeStream.destroy(error))
    stream.pipe(writeStream)
  })
  return 'http://localhost:'+process.env.PORT+'/public/'+name
}

const server = new ApolloServer({
  uploads: false,
  schema,
  playground: true,
  context: ({ req }) => ({ user: req.user, uploadFile}),
})

const path = '/graphql'
app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: process.env.ORIGIN ?? 'http://localhost:3000', credentials: true }))
app.use('/public', express.static(`${__dirname}/../public`))
app.use(express.static(`${__dirname}/../public`))
app.use(express.urlencoded({ extended: false }))
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
app.use(
  path,
  jwt({
    secret: process.env.SECRET ?? 'default-secret',
    algorithms: ['HS256'],
    getToken: (req) => {
      if (req?.cookies?.token) {
        return req?.cookies?.token
      }
      if (req?.headers?.authorization?.split(' ')?.[0] === 'Bearer') {
        return req?.headers?.authorization?.split(' ')?.[1]
      }
      if (req?.query?.token) {
        return req?.query?.token
      }
      return null
    },
    credentialsRequired: false,
  }),
  (err, req, res, next) => {
    res.status(200).json({
      errors: [
        {
          message: err.message,
        },
      ],
    })
  },
)
server.applyMiddleware({ app, path, cors: { origin: process.env.ORIGIN ?? 'http://localhost:3000', credentials: true }})

const port = process.env.PORT ?? 3001
app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
})
