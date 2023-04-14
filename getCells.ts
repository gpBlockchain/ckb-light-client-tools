import {lightClientRPC} from "./config";
import {BI, helpers} from "@ckb-lumos/lumos";


const run = async () => {
    console.log("--- getCells ---")
    let queryAddress = "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsq0vm8l7xmd65nscxs8789z37le3qqh7gns6t0f3y"
    console.log(`address:${queryAddress}`)
    console.log(JSON.stringify(helpers.addressToScript(queryAddress)))
    lightClientRPC.getCells({
        script: helpers.addressToScript(queryAddress),
        scriptType: "lock"
    },"asc","0xfff").then((result)=>{

        result.objects.filter(cell=>cell.output.type === null).forEach((indexerCell,idx)=>{
            console.log(`cellIdx:${idx} cell cap:${BI.from(indexerCell.output.capacity).toNumber()} blockNo:${BI.from(indexerCell.blockNumber).toNumber()} idx:${BI.from(indexerCell.txIndex).toNumber()}`)
        })
        console.log('--- type is not null ---')
        result.objects.filter(cell=>cell.output.type !== null).forEach((indexerCell,idx)=>{
            console.log(`cellIdx:${idx} cell cap:${BI.from(indexerCell.output.capacity).toNumber()} blockNo:${BI.from(indexerCell.blockNumber).toNumber()} idx:${BI.from(indexerCell.txIndex).toNumber()}`)
        })
    })
}

run()
