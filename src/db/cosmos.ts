import { CosmosClient } from "@azure/cosmos";

const config = {
  endpoint: "https://habimoridb.documents.azure.com:443/",
  key: "M3N2mPUzt6JxFFH47d6Q6Tu1p6uPLCfVSzJT4i2fADMFBJN1OjCVtnQixyXEjNEodd0euz0omCyEQW3N2QslNA==",
  databaseId: "HabimoriDB",
  containerId: "Users",
  partitionKey: { kind: "Hash", paths: ["/b2c_id"] }
};
  
export async function create_item(b2c_id: string, name: string, state: number, commit: number, position: {x: number, y: number, url: string}[] ): Promise<void> {
  const { endpoint, key, databaseId, containerId,} = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  const newItem = {
    b2c_id: b2c_id,
    name: name,
    state: state,
    commit: commit,
    position: position,
  };
  await container.items.create(newItem);
}
