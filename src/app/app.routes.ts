import { AboutPageComponent } from './routes/about-page.component';
import { ThrowErrorPageComponent } from './routes/throw-error-page.component';
import { LogErrorPageComponent } from './routes/log-error-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: 'throw-error', component: ThrowErrorPageComponent },
	{ path: 'log-error', component: LogErrorPageComponent },
	{ path: 'about', component: AboutPageComponent },
	{ path: '', redirectTo: 'throw-error', pathMatch: 'full' },
	{ path: '**', redirectTo: 'throw-error' },
];
