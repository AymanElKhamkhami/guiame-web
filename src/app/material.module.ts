import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

@NgModule({
    imports: [
        MatProgressSpinnerModule,
        MatDialogModule
    ],
    exports: [
        MatProgressSpinnerModule,
        MatDialogModule
    ]
})

export class MaterialModule { }