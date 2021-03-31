import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { PublicIpService } from "./public-ip.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [PublicIpService]
})
export class AppComponent implements OnInit {
  name: string = 'Luca';
  language: 'en' | 'it' = 'en';
  languages = ['en', 'it'];
  publicIp: Observable<string>;

  color: string;

  constructor(private publicIpService: PublicIpService) {}

  ngOnInit() {
    this.publicIp = this.publicIpService.get();
  }
}
