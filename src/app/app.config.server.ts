import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { SearchFilterPipe } from './service/search.pipe';
import { AddCarModule } from './add-car/add-car.module';
// import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
const serverConfig: ApplicationConfig = {


  providers: [
    AddCarModule,
    // GooglePlaceModule,
    provideServerRendering(),
    { provide: 'googleMapsApiKey', useValue: '' }
    
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
