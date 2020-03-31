import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../core/services/authentication.service';
import { UserService } from '../../core/services/user.service';
import { from } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
    ) {
        // redirect to home if already logged in
        //TODO
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        const user = new User();
        user.email = this.f.username.value;
        user.fullName = `${this.f.firstName.value} ${this.f.lastName.value}`;
        user.isActive = true;
        user.isAdmin = true;
        user.isStaff = true;
        user.password = this.f.password.value;
        this.loading = true;
        this.userService.register(user)
            .pipe(first())
            .subscribe(
                data => {
                   // this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                  //  this.alertService.error(error);
                    this.loading = false;
                    console.log(error);
                });
    }

    // constructor() {}
    
    // ngOnInit() {}
}