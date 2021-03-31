import { Component, OnInit } from "@angular/core";
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

  constructor(private publicIp: PublicIpService) {}

  ngOnInit() {
    this.publicIp.get().subscribe(console.log);
  }
}
