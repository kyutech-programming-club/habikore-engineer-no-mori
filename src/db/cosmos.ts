import { CosmosClient } from "@azure/cosmos";
import { userInfo } from "os";
import { useRecoilState } from "recoil";
import { userState } from "../atom/atoms";
import { AccountInfo } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';

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

export async function get_user(): Promise<void> {
  const { endpoint, key, databaseId, containerId,} = config;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);
  console.log("aa");
  
  const { accounts } = useMsal();
  if (accounts.length > 0) {
    const account = accounts[0] as Account;
    const querySpec = {
      query: "SELECT * from c"
    };
  
    const [user, setUser] = useRecoilState(userState)
  
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
    items.forEach((element) => {
      if (element.b2c_id == account.idTokenClaims?.sub) {
        console.log(element.name);
        setUser({
          b2c_id: String(element.b2c_id),
          name: String(element.name),
          state: element.state,
          totalPoint: element.totalPoint,
          usedPoint: element.userdPoint,
          position: element.position,
          id: String(element.id),
        })
    }});
  }
  
}
