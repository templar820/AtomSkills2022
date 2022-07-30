import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import ClaimTypeService from "../services/ClaimTypeService";

export interface IClaimsType{
    id: string;
    name_claim: string;
    caption_claim: string;
}

/**
 * Типы зявок
 */
@Route('/claim-type')
@Tags('claim-type')
@Security('api_key')
class ClaimTypeController extends Controller implements ASController<ASController<IClaimsType>>{
    service;

    constructor() {
        super();
        this.service = ClaimTypeService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<ASController<IClaimsType>> {
        const answer = this.service.getOne(id);
        return answer;
    }

    @Get()
    public async getAll(): Promise<ASController<IClaimsType[]>> {
        const answer = this.service.getAll();
        return answer;
    }

    @Post()
    public async create(@Body() body: IClaimsType): Promise<ASController<IClaimsType>> {
        const answer = this.service.create(body as IClaimsType);
        return answer;
    }

    @Patch()
    public async update(@Body() body: IClaimsType): Promise<ASController<IClaimsType>> {
        const answer = this.service.update(body as IClaimsType);
        return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: IClaimsType): Promise<ASController<IClaimsType>> {
        const answer = this.service.delete(body as IClaimsType);
        return answer;
    }
}

export default new ClaimTypeController();
