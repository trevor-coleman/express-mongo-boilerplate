import { Express } from 'express';

const startViewEngine = (app:Express) =>{
    app.set('view engine', 'pug');
    app.set('views', './src/views');
}

export default startViewEngine;