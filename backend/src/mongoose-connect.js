import mongoose from 'mongoose'

mongoose.Promise = Promise
mongoose.connect(
  'mongodb+srv://user:<password>@cluster0.7nbwu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    dbName: 'test',
    user: 'user',
    pass: 'pass',
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
)
