import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UserSelfGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req=context.switchToHttp().getRequest()
        if(req.user.id !=req.params.id){
            throw new ForbiddenException({
                message:"Forbidden User"
            })
        }
        return true

    }
}