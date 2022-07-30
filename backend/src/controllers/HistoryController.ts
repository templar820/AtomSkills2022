import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import {IClaims} from "./ClaimsController";
import {IState} from "./StateController";
import HistoryService from "../services/HistoryService";

export interface IHistory{
    id: string;
    claim: IClaims
    state: IState;
    date_start: string;
    date_end: string;
    comment: string
}

@Route('/history')
@Tags('history')
@Security('api_key')
class HistoryController extends Controller implements ASController<IHistory>{
    service;

    constructor() {
        super();
        this.service = HistoryService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<ASController<IHistory>> {
        const answer = this.service.getOne(id);
        return answer;
    }

    @Get('/claim/{id}')
    public async getAll(id: number): Promise<IHistory[]> {
        const answer = this.service.getAll(id);
        return answer;
    }
}

export default new HistoryController();
