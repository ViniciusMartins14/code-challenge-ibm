import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductMeta {
    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
    
    @Field()
    barcode: string;

    @Field()
    qrCode: string;
}