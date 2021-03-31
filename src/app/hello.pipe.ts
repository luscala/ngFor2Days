import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "hello" })
export class HelloPipe implements PipeTransform {
  transform(name: string, language: 'en' | 'it' = 'en'): string {
    return !!name ? `${language === 'en' ? 'Hello' : 'Ciao'} ${name}!` : '';
  }
}
