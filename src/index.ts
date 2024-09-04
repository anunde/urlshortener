import 'reflect-metadata';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { Router} from './routes'
import { DatabaseService } from './config/database';
import { container } from './config/inversify.config';


//Desplegar en Vercel, Hono con cloud function
//Elegir Hono en funcion de donde quiera desplegar

//Mantener estandarización a la hora de mantener sintaxis asíncronas
//Coherencia con el uso de POO
class Main {
  static app = new Hono()

  static async init() {
    const databaseService = container.get<DatabaseService>(DatabaseService);

    await databaseService.connectDB();

    Router.register(Main.app);

    const port = 3000;
    console.log(`Server is running on port ${port}`);

    serve({
        fetch: Main.app.fetch,
        port
    });
}

}

Main.init()