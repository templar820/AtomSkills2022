import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import PeopleService from "../services/PeopleService";
import {IUserExport} from "./UserController";

@Route('/people')
@Tags('people')
@Security('api_key')
class PeopleController extends Controller implements ASController<IUserExport>{
    service;

    constructor() {
        super();
        this.service = PeopleService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<ASController<IUserExport>> {
        const answer = this.service.getOne(id);
        return answer;
    }

    @Get('/role/{id}')
    public async getAll(id: number): Promise<ASController<IUserExport>> {
        const answer = this.service.getAll(id);
        return answer;
    }

    @Post()
    public async create(@Body() body: IUserExport): Promise<ASController<IUserExport>> {
        const answer = this.service.create(body as IUserExport);
        return answer;
    }

    @Patch()
    public async update(@Body() body: IUserExport): Promise<ASController<IUserExport>> {
        const answer = this.service.update(body as IUserExport);
        return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: IUserExport): Promise<ASController<IUserExport>> {
        const answer = this.service.delete(body as IUserExport);
        return answer;
    }
}

export default new PeopleController();
