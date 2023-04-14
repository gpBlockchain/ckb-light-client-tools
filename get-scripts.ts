import {lightClientRPC} from "./config";
import {BI, helpers} from "@ckb-lumos/lumos";


const run = async () => {
    console.log("--- getScripts ---")
    lightClientRPC.getScripts()
        .then((scripts) =>
            scripts.forEach((script, idx) => {
            console.log(`idx:${idx},sync blockNo:${BI.from(script.blockNumber).toNumber()} ckb address:${helpers.encodeToAddress(script.script)} codeHash:${script.script.codeHash}`)
        }))
}

run()
