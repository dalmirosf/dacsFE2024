//INTERCEPTOR NUESTRO QUE NO ESTA EN USO

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwt = this.authService.getToken();

    if (jwt) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + jwt)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}