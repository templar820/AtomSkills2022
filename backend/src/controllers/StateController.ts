import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import SlaService from "../services/SlaService";
import StateService from "../services/StateService";

export interface IState{
    id: string;
    name_state: string;
    caption_state: string;
}

@Route('/state')
@Tags('state')
@Security('api_key')
class StateController extends Controller implements ASController<IState>{
    service;

    constructor() {
        super();
        this.service = StateService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<ASController<IState>> {
        const answer = this.service.getOne(id);
        return answer;
    }

    @Get()
    public async getAll(): Promise<ASController<IState[]>> {
        const answer = this.service.getAll();
        return answer;
    }

    @Post()
    public async create(@Body() body: IState): Promise<ASController<IState>> {
        const answer = this.service.create(body as IState);
        return answer;
    }

    @Patch()
    public async update(@Body() body: IState): Promise<ASController<IState>> {
        const answer = this.service.update(body as IState);
        return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: IState): Promise<ASController<IState>> {
        const answer = this.service.delete(body as IState);
        return answer;
    }
}

export default new StateController();
