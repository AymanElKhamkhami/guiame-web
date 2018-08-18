import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
    imports: [
        MatProgressSpinnerModule
    ],
    exports: [
        MatProgressSpinnerModule
    ]
})

export class MaterialModule { }