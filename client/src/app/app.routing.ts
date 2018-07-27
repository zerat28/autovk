import {Routes, RouterModule} from '@angular/router';
import {NotfoundComponent} from "./core/views/notfound/notfound.component";


const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/user/user.module#UserModule',
  },
  {path: '**', component: NotfoundComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
