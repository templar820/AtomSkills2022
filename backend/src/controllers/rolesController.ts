import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import RoleService from "../services/RoleService";

export interface IRole{
    id: string;
    name_role: string;
    caption_role: string;
}

@Route('/role')
@Tags('Role')
@Security('api_key')
class RoleController extends Controller implements ASController<IRole>{
    service;

    constructor() {
        super();
        this.service = RoleService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<IRole> {
        const answer = this.service.getOne(id);
        return answer;
    }

    @Get()
    public async getAll(): Promise<IRole[]> {
        const answer = this.service.getAll();
        return answer;
    }

    @Post()
    public async create(@Body() body: IRole): Promise<IRole> {
        const answer = this.service.create(body as IRole);
        return answer;
    }

    @Patch()
    public async update(@Body() body: IRole): Promise<IRole> {
        const answer = this.service.update(body as IRole);
        return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: IRole): Promise<IRole> {
        const answer = this.service.delete(body as IRole);
        return answer;
    }
}

export default new RoleController();
