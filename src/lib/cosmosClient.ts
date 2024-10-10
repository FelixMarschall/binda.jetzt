import { CosmosClient } from "@azure/cosmos";
import { DB_KEY } from "$env/static/private";

const endpoint = "https://binda-db.documents.azure.com:443/";
const key = DB_KEY;
const databaseId = "binda";
const containerIdMyEvents = "myEvents";
const containerIdAttendEvents = "attendEvents";

class CosmosClientSingleton {
  private static instance: CosmosClientSingleton;
  public client: CosmosClient;
  public database: ReturnType<CosmosClient['database']>;
  public containerMyEvents: ReturnType<ReturnType<CosmosClient['database']>['container']>;
  public containerAttendEvent: ReturnType<ReturnType<CosmosClient['database']>['container']>;

  private constructor() {
    this.client = new CosmosClient({ endpoint, key });
    this.database = this.client.database(databaseId);
    this.containerMyEvents = this.database.container(containerIdMyEvents);
    this.containerAttendEvent = this.database.container(containerIdAttendEvents);
  }

  public static getInstance(): CosmosClientSingleton {
    if (!CosmosClientSingleton.instance) {
      CosmosClientSingleton.instance = new CosmosClientSingleton();
    }
    return CosmosClientSingleton.instance;
  }
}

export const cosmosClientSingleton = CosmosClientSingleton.getInstance();
