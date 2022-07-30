import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import SlaService from "../services/SlaService";

export interface ISla{
    id: string;
    time_sla: number;
    name_sla: string;
    caption_sla: string;
}

@Route('/sla')
@Tags('sla')
@Security('api_key')
class SlaController extends Controller implements ASController<ISla>{
    service;

    constructor() {
        super();
        this.service = SlaService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<ASController<ISla>> {
        const answer = this.service.getOne(id);
        return answer;
    }

    @Get()
    public async getAll(): Promise<ASController<ISla[]>> {
        const answer = this.service.getAll();
        return answer;
    }

    @Post()
    public async create(@Body() body: ISla): Promise<ASController<ISla>> {
        const answer = this.service.create(body as ISla);
        return answer;
    }

    @Patch()
    public async update(@Body() body: ISla): Promise<ASController<ISla>> {
        const answer = this.service.update(body as ISla);
        return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: ISla): Promise<ASController<ISla>> {
        const answer = this.service.delete(body as ISla);
        return answer;
    }
}

export default new SlaController();
