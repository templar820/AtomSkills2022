import {
    Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import ClaimsService from "../services/ClaimsService";
import {IClaimsType} from "./ClaimsTypeController";
import {IState} from "./StateController";
import {IUserExport} from "./UserController";
import {IPriority} from "./PriorityBoilerplate";

export interface IClaims{
    id: string;
    create_date: string;
    type: string;
    text: string;
    time_according_sla: number;
    place_of_service: string;
    date_time_edit_state: string;
    date_time_close_claim: string;
    comment: string;
    state_of_claims: IState,
    claim_type: IClaimsType,
    executor_of_claims: IUserExport,
    author_of_claims: IUserExport,
    priority_of_claims: IPriority
}

/**
 * Заявки
 */
@Route('/claims')
@Tags('claims')
@Security('api_key')
class ClaimsController extends Controller implements ASController<IClaims>{
    service;

    constructor() {
        super();
        this.service = ClaimsService;
        autoBind(this);
    }

    @Get('{id}')
    public async getOne(id: number): Promise<ASController<IClaims>> {
        const answer = this.service.getOne(id);
        return answer;
    }

    @Get()
    public async getAll(): Promise<ASController<IClaims[]>> {
        const answer = this.service.getAll();
        return answer;
    }

    @Post()
    public async create(@Body() body: IClaims): Promise<ASController<IClaims>> {
        const answer = this.service.create(body as IClaims);
        return answer;
    }

    @Patch()
    public async update(@Body() body: IClaims): Promise<ASController<IClaims>> {
        const answer = this.service.update(body as IClaims);
        return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: IClaims): Promise<ASController<IClaims>> {
        const answer = this.service.delete(body as IClaims);
        return answer;
    }

    @Post('/auto-distribution-claims')
    public async autoDistribution(@Body() body): Promise<ASController<IClaims>> {
        const answer = this.service.autoDistribution(body as IClaims);
        return answer;
    }
}

export default new ClaimsController();
