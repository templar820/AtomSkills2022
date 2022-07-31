import {
  Body, Controller, Delete, Get, Patch, Post, Request, Route, Security, Tags
} from 'tsoa';
import autoBind from 'auto-bind';
import { ASController } from './interfaces';
import PeopleService from '../services/PeopleService';
import { IUserExport } from './UserController';
import { sendMail } from '../utils/Mailer';
import UserService from '../services/UserService';

interface ISendMail {
    email: string;
    userId: string;
    text: string;
    subject: string;
}
interface UserClaimType {id?:number, userId: number, name: string, surname: string, email: string}
interface UserClaimRelation {userId: number, claimTypeIds: number[]}

@Route('/people')
@Tags('people')
@Security('api_key')
class PeopleController extends Controller implements ASController<IUserExport> {
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

    @Post('sendMail')
    public async send_mail(@Body() body: ISendMail): Promise<ASController<void>> {
      if (!body.email) {
        const user = (await UserService.getOne(Number(body.userId)));
        console.log(user);
        body.email = user.email;
      }
      console.log(false);
      sendMail(body, (err, reply) => {
        console.log(err);
      });
    }

    @Get()
    public async getAll(): Promise<IUserExport[]> {
      const answer = this.service.getAll();
      return answer;
    }

    @Get('/role/{id}')
    public async getAllByRole(id: number): Promise<ASController<IUserExport>> {
      const answer = this.service.getAllByRole(id);
      return answer;
    }

    @Get('/claim-type/{id}')
    public async getAllByClaimType(id: number): Promise<ASController<UserClaimType>> {
      const answer = this.service.getAllByClaimType(id);
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

    /**
     * Получение типов по userId
     * @param body
     */
    @Get('/claims-relation/{id}')
    public async getClaimsRelations(id: number): Promise<ASController<UserClaimRelation>> {
        const answer = this.service.getClaimsRelationsByUser(id);
        return answer;
    }

    /**
     * Создание/обновление типов заявок поддерживаемых исполнителем
     * @param body
     */
    @Post('/claims-relation')
    public async createClaimsRelations(@Body() body: UserClaimRelation): Promise<ASController<UserClaimRelation>> {
      const answer = this.service.createClaimsRelations(body);
      return answer;
    }

    @Delete('{id}')
    public async delete(@Body() body: IUserExport): Promise<ASController<IUserExport>> {
      const answer = this.service.delete(body as IUserExport);
      return answer;
    }
}

export default new PeopleController();
