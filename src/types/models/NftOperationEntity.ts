// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type NftOperationEntityProps = Omit<NftOperationEntity, NonNullable<FunctionPropertyNames<NftOperationEntity>>>;

export class NftOperationEntity implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockId: string;

    public extrinsicId: string;

    public nftId: string;

    public from: string;

    public to: string;

    public timestamp: Date;

    public typeOfTransaction: string;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NftOperationEntity entity without an ID");
        await store.set('NftOperationEntity', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NftOperationEntity entity without an ID");
        await store.remove('NftOperationEntity', id.toString());
    }

    static async get(id:string): Promise<NftOperationEntity | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NftOperationEntity entity without an ID");
        const record = await store.get('NftOperationEntity', id.toString());
        if (record){
            return NftOperationEntity.create(record as NftOperationEntityProps);
        }else{
            return;
        }
    }


    static async getByNftId(nftId: string): Promise<NftOperationEntity[] | undefined>{
      
      const records = await store.getByField('NftOperationEntity', 'nftId', nftId);
      return records.map(record => NftOperationEntity.create(record as NftOperationEntityProps));
      
    }

    static async getByFrom(from: string): Promise<NftOperationEntity[] | undefined>{
      
      const records = await store.getByField('NftOperationEntity', 'from', from);
      return records.map(record => NftOperationEntity.create(record as NftOperationEntityProps));
      
    }

    static async getByTo(to: string): Promise<NftOperationEntity[] | undefined>{
      
      const records = await store.getByField('NftOperationEntity', 'to', to);
      return records.map(record => NftOperationEntity.create(record as NftOperationEntityProps));
      
    }

    static async getByTimestamp(timestamp: Date): Promise<NftOperationEntity[] | undefined>{
      
      const records = await store.getByField('NftOperationEntity', 'timestamp', timestamp);
      return records.map(record => NftOperationEntity.create(record as NftOperationEntityProps));
      
    }


    static create(record: NftOperationEntityProps): NftOperationEntity {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new NftOperationEntity(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
