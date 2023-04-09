import { db } from '@config';
import mongoose from 'mongoose';

import { Permission, Role, User } from './seeder/index';

// const dbURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${
//     db.host
// }:${db.port}/${db.name}`;

const dbURI =
    process.env.NODE_ENV == 'test'
        ? 'mongodb://127.0.0.1:27017/tempTest'
        : 'mongodb://127.0.0.1:27017/temp';

const options = {
    autoIndex: true,
    minPoolSize: db.minPoolSize, // Maintain up to x socket connections
    maxPoolSize: db.maxPoolSize, // Maintain up to x socket connections
    connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000 // Close sockets after 45 seconds of inactivity
};

function setRunValidators(this: any, next: (err?: any) => any) {
    this.setOptions({ runValidators: true });
    next();
}

mongoose.set('strictQuery', true);

// Create the database connection
console.log('hello');
mongoose
    .connect(dbURI, options)
    .then(async () => {
        console.log('hello');
        await Permission.seed();
        await Role.seed();
        await User.seed();
    })
    .catch((e) => {
        // Logger.info('Mongoose connection error');
        // Logger.error(e);
        console.log('hello lop');
    });
