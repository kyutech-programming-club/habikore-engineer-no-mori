import { CosmosClient } from "@azure/cosmos";
import { useRecoilState } from "recoil";
import { userState } from "../atom/atoms";
import { AccountInfo } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";

interface Account extends AccountInfo {
  idTokenClaims: {
    aud: string;
    auth_time: number;
    family_name: string;
    given_name: string;
    emails: string[];
    iss: string;
    nbf: number;
    nonce: string;
    sub: string;
    tfp: string;
    ver: string;
    name: string;
    newUser: boolean;
  };
}

const config = {
  endpoint: "https://habimoridb.documents.azure.com:443/",
  key: "M3N2mPUzt6JxFFH47d6Q6Tu1p6uPLCfVSzJT4i2fADMFBJN1OjCVtnQixyXEjNEodd0euz0omCyEQW3N2QslNA==",
  databaseId: "HabimoriDB",
  containerId: "Users",
  partitionKey: { kind: "Hash", paths: ["/b2c_id"] },
};

export async function create_user(
  b2c_id: string,
  name: string,
  state: number,
  commit: number,
  position: { x: number; y: number; url: string }[]
): Promise<void> {
  const { endpoint, key, databaseId, containerId } = config;
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

export async function update_user(
  b2c_id: string,
  name: string,
  state: number,
  commit: number,
  position: { x: number; y: number; url: string }[] | null,
  id: string
): Promise<void> {
  const { endpoint, key, databaseId, containerId } = config;
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

export async function get_user(b2c_id: string | undefined) {
  const { endpoint, key, databaseId, containerId } = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  console.log("aa");
  const querySpec = {
    query: "SELECT * from c",
  };

  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();
  const list: any[] = [];
  items.forEach((element) => {
    if (element.b2c_id == b2c_id) {
      console.log(element.name);
      list.push(element.b2c_id);
      list.push(element.name);
      list.push(element.state);
      list.push(element.totalPoint);
      list.push(element.usedPoint);
      list.push(element.position);
      list.push(element.id);
    }
  });
  return list;
}
