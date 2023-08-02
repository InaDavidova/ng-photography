import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateComponent } from './pages/create/create.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UpdateComponent } from './pages/update/update.component';

const routes: Routes = [
  { path: 'home', redirectTo: '/' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'create', component: CreateComponent, canActivate:[AuthGuard] },
  { path: 'update/:id', component: UpdateComponent, canActivate:[AuthGuard] },
  { path: 'details/:id', component: DetailsComponent },
  { path: '**', component: NotFoundComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
