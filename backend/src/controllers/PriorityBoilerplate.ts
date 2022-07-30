import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import PriorityService from "../services/PriorityService";

export interface IPriority{
    id: string;
    name_priority: string;
    caption_priority: string;
}

/**
 * Приоритеты
 */
@Route('/priority')
@Tags('priority')
@Security('api_key')
class PriorityBoilerplate extends Controller implements ASController<IPriority>{
    service;

    constructor() {
        super();
        this.service = PriorityService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<ASController<IPriority>> {
        const answer = this.service.getOne(id);
        return answer;
    }

    @Get()
    public async getAll(): Promise<ASController<IPriority[]>> {
        const answer = this.service.getAll();
        return answer;
    }

    @Post()
    public async create(@Body() body: IPriority): Promise<ASController<IPriority>> {
        const answer = this.service.create(body as IPriority);
        return answer;
    }

    @Patch()
    public async update(@Body() body: IPriority): Promise<ASController<IPriority>> {
        const answer = this.service.update(body as IPriority);
        return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: IPriority): Promise<ASController<IPriority>> {
        const answer = this.service.delete(body as IPriority);
        return answer;
    }
}

export default new PriorityBoilerplate();
