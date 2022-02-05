import { CosmosClient } from "@azure/cosmos";
import { userInfo } from "os";
import { useRecoilState } from "recoil";
import { userState } from "../atom/atoms";

const config = {
  endpoint: "https://habimoridb.documents.azure.com:443/",
  key: "M3N2mPUzt6JxFFH47d6Q6Tu1p6uPLCfVSzJT4i2fADMFBJN1OjCVtnQixyXEjNEodd0euz0omCyEQW3N2QslNA==",
  databaseId: "HabimoriDB",
  containerId: "Users",
  partitionKey: { kind: "Hash", paths: ["/b2c_id"] }
};
  
export async function create_user(b2c_id: string, name: string, state: number, commit: number, position: {x: number, y: number, url: string}[] ): Promise<void> {
  const { endpoint, key, databaseId, containerId,} = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  const newUser = {
    b2c_id: b2c_id,
    name: name,
    state: state,
    commit: commit,
    position: position,
  };
  await container.items.create(newUser);
}

export async function update_user(b2c_id: string, name: string, state: number, commit: number, position: {x: number, y: number, url: string}[] | null, id: string ): Promise<void> {
  const { endpoint, key, databaseId, containerId,} = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  const newUser = {
    b2c_id: b2c_id,
    name: name,
    state: state,
    commit: commit,
    position: position,
    id: id,
  };
  await container.item(id, b2c_id).replace(newUser);
}

export async function get_user(id: string ): Promise<void> {
  const { endpoint, key, databaseId, containerId,} = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  const querySpec = {
    query: "SELECT * from c"
  };

  const [user, setUser] = useRecoilState(userState)

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  items.forEach((element) => {
    if (element.id = id) {
      user.id = element.id;
      user.b2c_id = element.b2c_id;
      user.name = element.name;
      user.state = element.state;
      user.totalPoint = element.totalPoint;
      user.position = element.position;
  }});
}
