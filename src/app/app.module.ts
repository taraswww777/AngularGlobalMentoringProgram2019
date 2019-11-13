import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LogoComponent} from './logo/logo.component';
import {PageCoursesComponent} from './page-courses/page-courses.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {BreadcrumbsItemComponent} from './breadcrumbs/breadcrumbs-item/breadcrumbs-item.component';
import {CoursesListComponent} from './courses-list/courses-list.component';
import {CoursesItemComponent} from './courses-item/courses-item.component';
import {LogoutLinkComponent} from './auth/logout-link/logout-link.component';
import {LoginLinkComponent} from './auth/login-link/login-link.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {CoursesAddComponent} from './courses-add/courses-add.component';
import {CoursesEditComponent} from './courses-edit/courses-edit.component';
import {CoursesDeleteComponent} from './courses-delete/courses-delete.component';
import {CoursesLoadMoreComponent} from './courses-load-more/courses-load-more.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from './loader/loader.component';
import {CoursesService} from 'src/services/CoursesService';
import {FreshCourseDirective} from 'src/directives/fresh-course';
import { DateComponent } from './date/date.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		LogoComponent,
		PageCoursesComponent,
		BreadcrumbsComponent,
		BreadcrumbsItemComponent,
		CoursesListComponent,
		CoursesItemComponent,
		CoursesItemComponent,
		LogoutLinkComponent,
		LoginLinkComponent,
		SearchInputComponent,
		CoursesAddComponent,
		CoursesEditComponent,
		CoursesDeleteComponent,
		CoursesLoadMoreComponent,
		LoaderComponent,
		FreshCourseDirective,
		DateComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		CoursesService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
