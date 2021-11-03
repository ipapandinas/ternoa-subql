import { SubstrateExtrinsic } from "@subql/types";
import { checkIfExtrinsicExecuteSuccess } from "../helpers";
import { ExtrinsicEntity } from "../types";

export const genericExtrinsicHandler = async (extrinsic: SubstrateExtrinsic): Promise<void> => {
    try{
        const ext = extrinsic.extrinsic
        const block = extrinsic.block
        const methodData = ext.method
        const documentation = JSON.parse(JSON.stringify(ext.meta)).documentation
        /* Record Extrinsic data */
        const extrinsicRecord = new ExtrinsicEntity(`${block.block.header.number.toString()}-${extrinsic.idx}`)
        extrinsicRecord.blockId = block.block.header.number.toString()
        extrinsicRecord.extrinsicIndex = extrinsic.idx
        extrinsicRecord.hash = ext.hash.toString()
        extrinsicRecord.timestamp = block.timestamp
        extrinsicRecord.module = methodData.section
        extrinsicRecord.call = methodData.method
        if (documentation) extrinsicRecord.description = documentation.map(d => d.toString()).join('\n')
        extrinsicRecord.signer = ext.signer.toString()
        extrinsicRecord.isSigned = ext.isSigned
        extrinsicRecord.signature = ext.signature.toString()
        extrinsicRecord.nonce = ext.nonce.toNumber()
        extrinsicRecord.success = checkIfExtrinsicExecuteSuccess(extrinsic)
        extrinsicRecord.argsName = methodData.meta.args.map(a => a.name.toString())
        extrinsicRecord.argsValue = methodData.args.map((a) => a.toString())
        extrinsicRecord.nbEvents = extrinsic.events.length
        extrinsicRecord.fees = await getFees(ext.toHex(), block.block.header.hash.toHex())
        await extrinsicRecord.save()
    }catch(err){
        logger.error(`record extrinsic error at : hash(${extrinsic.extrinsic.hash}) and block nb ${extrinsic.block.block.header.number.toNumber()}`);
        logger.error('record extrinsic error detail:' + err);
        if (err.sql) logger.error('record extrinsic error sql detail:' + err.sql);
    }
}

export const getFees = async (extObjectHash: string, blockHash: string) => {
    try{
        const fees = await api.rpc.payment.queryFeeDetails(extObjectHash, blockHash)
        if (fees){
            const feesFormatted = JSON.parse(JSON.stringify(fees))
            if (feesFormatted.inclusionFee){
                let totalFees = BigInt(0)
                if(feesFormatted.inclusionFee.basefee) totalFees += BigInt(feesFormatted.inclusionFee.basefee)
                if(feesFormatted.inclusionFee.lenfee) totalFees += BigInt(feesFormatted.inclusionFee.lenfee)
                if(feesFormatted.inclusionFee.adjustedWeightFee) totalFees += BigInt(feesFormatted.inclusionFee.adjustedWeightFee)
                return totalFees.toString()
            }
        }
        return ""
    }catch(err){
        logger.error(`get extrinsic fee error`);
        logger.error('get extrinsic fee error detail:' + err);
    }
}