import {
    BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: "Headerda token berilmagan" });
    }

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      throw new UnauthorizedException({
        messages: "Beared token berilmagan",
      });
    }
    
    async function verify(token:string, jwtService:JwtService) {
        let payload:any
        try {
            payload =await jwtService.verify(token,{
                secret:process.env.ACCESS_TOKEN_KEY
            })
        } catch (error) {
            console.log(error);
            throw new  BadRequestException(error)
        }
        if(!payload){
            throw new UnauthorizedException("Unauthorized Owner");
        }
        if(!payload.is_active){
            throw new ForbiddenException("Ruxsat etilmagan")
        }

        if (!payload.is_owner) {
          throw new ForbiddenException("Ruxsat etilmagan");
        }
        
        req.owner=payload
        return true
    }
    return verify(token, this.jwtService);
  }
  
}
