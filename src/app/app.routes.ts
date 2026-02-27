import { AboutPageComponent } from './routes/about-page.component';
import { ThrowErrorPageComponent } from './routes/throw-error-page.component';
import { LogErrorPageComponent } from './routes/log-error-page.component';
import { logOnUncaughtErrorGuard } from './routes/error-handling/log-on-uncaught-error.guard';
import { throwOnUncaughtErrorGuard } from './routes/error-handling/throw-on-uncaught-error.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: 'throw-error', component: ThrowErrorPageComponent, canActivate: [throwOnUncaughtErrorGuard] },
	{ path: 'log-error', component: LogErrorPageComponent, canActivate: [logOnUncaughtErrorGuard] },
	{ path: 'about', component: AboutPageComponent },
	{ path: '', redirectTo: 'throw-error', pathMatch: 'full' },
	{ path: '**', redirectTo: 'throw-error' },
];
