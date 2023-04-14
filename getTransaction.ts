import {lightClientRPC} from "./config";
import {BI, helpers} from "@ckb-lumos/lumos";
import {Output} from "@ckb-lumos/base/lib/api";


const run = async () => {
    console.log("--- getTransaction with fetch input cells ---")
    let queryTx = "0x7488494724701620393cec0107745ccac580c92de982fb167db9e132fe6f98d8"
    console.log('query tx:',queryTx)
    lightClientRPC.getTransaction("0x7488494724701620393cec0107745ccac580c92de982fb167db9e132fe6f98d8")
        .then((transaction) => {
                console.log(`transaction hash:${transaction.transaction.hash}`)
                // @ts-ignore
                console.log(`status:${transaction.txStatus.status}`)
                console.log(`transaction deps:`)
                transaction.transaction.cellDeps.forEach((cellDep, idx) => {
                    console.log(`depIdx:${idx} :${JSON.stringify(cellDep)}`)
                })
                console.log("outputs:")
                transaction.transaction.outputs.forEach((output,idx)=>{
                    console.log(`outIdx:${idx} address:${helpers.encodeToAddress(output.lock)} cap:${BI.from(output.capacity).toNumber()}`)
                })
                console.log("inputs:")
                transaction.transaction.inputs.forEach((input, idx) => {
                    getCellByTransactionHashAndIdx(input.previousOutput.txHash, BI.from(input.previousOutput.index).toNumber())
                        .then((cell) => {
                            console.log(`inputIdx:${idx} address:${helpers.encodeToAddress(cell.lock)} cap:${BI.from(cell.capacity).toNumber()}`)
                        })
                })
            }
        )
}

async function getCellByTransactionHashAndIdx(hash: string, idx: number): Promise<Output> {
    // wait tx fetch
    return await fetchTx(hash)
        .then(()=> lightClientRPC.getTransaction(hash))
        .then((tx)=> tx.transaction.outputs[idx])
}

async function fetchTx(hash:string):Promise<void>{
    for (let i = 0; i < 10; i++) {
        let rt =  await lightClientRPC.fetchTransaction(hash)
        if(rt.status === "fetched"){
            return
        }
        await Sleep(1000)
    }
}

export async function Sleep(timeout: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

run()
