import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  languages = [{code: "en", name: "English"}, {code: "es", name: "Español"}];

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.languages[0].code);
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
