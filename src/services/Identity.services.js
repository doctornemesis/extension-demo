import { RHS_URL } from "../constants";
import { ExtensionService } from "./Extension.service";
const { core } = window.PolygonIdSdk;
export class IdentityServices {
  static instanceIS;
  static async createIdentity() {
    if (!this.instanceIS) {
      const { wallet } = ExtensionService.getExtensionServiceInstance();
    

      let identity = await wallet.createIdentity("http://polygonID.com/", {
        method: core.DidMethod.Iden3,
        blockchain: core.Blockchain.Polygon,
        networkId: core.NetworkId.Mumbai,
        rhsUrl: RHS_URL,
      });
      console.log("!!!!!!!!!!!!!!!!", identity);
      this.instanceIS = identity;
      return this.instanceIS;
    } else return this.instanceIS;
  }

  static getIdentityInstance() {
    return this.instanceIS;
  }
}
