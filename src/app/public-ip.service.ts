import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PublicIpService {
  constructor(private http: HttpClient) {}

  get(): Observable<string> {
    return this.http.get<{ ip_addr: string }>('https://ifconfig.me/all.json')
      .pipe(map(({ ip_addr }) => ip_addr));
  }
}