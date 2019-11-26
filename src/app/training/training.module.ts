import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StopTrainingComponent } from './current-training/stop-training.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
  ],
  imports: [
    SharedModule,
    AngularFirestoreModule,

  ]
})
export class TrainingModule {}
