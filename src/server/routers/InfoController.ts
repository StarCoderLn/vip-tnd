import { route, GET } from 'awilix-koa';
import Router from 'koa-router';
import { IInfo } from '@interfaces/IInfo';

@route('/api')
class InfoController {
  private infoService: IInfo;

  constructor({ infoService }: { infoService: IInfo }) {
    this.infoService = infoService;
  }

  @route('/info')
  @GET()
  async actionInfo(ctx: Router.IRouterContext): Promise<void> {
    const data = await this.infoService.getInfo();
    ctx.body = {
      ...data
    };
  }
}

export default InfoController;
