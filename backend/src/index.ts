import "source-map-support/register";
import * as http from "http";
// 3p
import { Config, createApp, Logger, ServiceManager } from "@foal/core";

// App
import { AppController } from "./app/app.controller";
import { dataSource } from "./db";
import { WebsocketController } from "./app/controllers/wb";

async function main() {
  await dataSource.initialize();

  const serviceManager = new ServiceManager();
  const logger = serviceManager.get(Logger);

  const app = await createApp(AppController, { serviceManager });
  const httpServer = http.createServer(app);
  // Instanciate, init and connect websocket controllers.
  await serviceManager.get(WebsocketController).attachHttpServer(httpServer);

  const port = Config.get("port", "number", 3001);
  httpServer.listen(port, () => logger.info(`Listening on port ${port}...`));
}

main().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
