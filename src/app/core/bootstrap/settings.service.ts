import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings, defaults } from '../settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private notify$ = new BehaviorSubject<Record<string, any>>({});
  private options = defaults;

  get notify(): Observable<Record<string, any>> {
    return this.notify$.asObservable();
  }

  getOptions() {
    return this.options;
  }

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaults, options);
    this.notify$.next(this.options);
  }

  getLanguage() {
    return this.options.language;
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.notify$.next({ lang });
  }
}
