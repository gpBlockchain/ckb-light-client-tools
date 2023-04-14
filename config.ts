import {LightClientRPC} from "@ckb-lumos/light-client";
import {config} from "@ckb-lumos/lumos";

require('dotenv').config();

export const lightClientRPC =  new LightClientRPC(process.env["CKB_LIGHT_RPC_URL"])
config.initializeConfig(
    config.predefined.AGGRON4
);
