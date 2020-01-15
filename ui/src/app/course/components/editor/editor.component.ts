import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { arrayUnsubscribe } from '../../../common/utils/array';
import { getCourses, updateCourse, addCourse } from '../../http/getCourses';
import { CourseFormControl, TCourse } from '../../models/course';
import _ from 'lodash';

export enum CourseEditorMode {
	ADD = 'ADD',
	EDIT = 'EDIT',
}

@Component({
	selector: 'course-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss']
})
export class CourseEditorComponent implements OnInit, OnDestroy {
	@Input() public mode: CourseEditorMode;
	@Input() public courseId?: number;
	@Input() public doAfterSave: (Course) => void = _.noop;

	public titleSubmit: string = 'Сохранить';
	public titleEditor: string = 'Создание';
	public course: CourseFormControl = new CourseFormControl();
	public isLoading = false;
	private subs: Subscription[] = [];

	constructor(
		private _cdRef: ChangeDetectorRef,
		private _httpClient: HttpClient,
		private _router: Router,
	) {
	}

	ngOnInit() {
		this.titleSubmit = this._isEditMode() ? 'Сохранить' : 'Создать';
		this.titleEditor = this._isEditMode() ? 'Редактирование' : 'Создание';

		if (this._isEditMode()) {
			this._startLoading();

			this.subs.push(
				this._getCourse()
					.subscribe(this.setCourse.bind(this), this._handleNotFound.bind(this))
			);
		}
	}

	private setCourse(course: TCourse) {
		this.course = new CourseFormControl(course);
		this._stopLoading();
		this._cdRef.markForCheck();
	}

	private _handleNotFound() {
		this._stopLoading();
		this._cdRef.markForCheck();
	}

	private _startLoading() {
		this.isLoading = true;
	}

	private _stopLoading() {
		this.isLoading = false;
	}

	private _getCourse() {
		return getCourses(this._httpClient, this.courseId);
	}

	public onSubmit() {
		if (confirm('U`re sure?')) {
			this._onSubmit();
		}
	}

	private _onSubmit() {
		const course = this.course.toJsonObject();
		if (this._isEditMode()) {
			this._startLoading();
			this.subs.push(updateCourse(this._httpClient, this.courseId, course)
				.subscribe(this._onSubscribeUpdate.bind(this), this._handleNotFound.bind(this))
			);
		} else {
			this.subs.push(addCourse(this._httpClient, course)
				.subscribe(this._onSubscribeAdd.bind(this), this._handleNotFound.bind(this))
			);
		}

	}

	private _onSubscribeAdd(course: TCourse) {
		alert(`Success updated course "${course.name}"`);
		this._stopLoading();
		this.doAfterSave(course);
		this._cdRef.markForCheck();
	}

	private _onSubscribeUpdate(course: TCourse) {
		alert(`Success updated course "${course.name}"`);
		this._stopLoading();
		this.doAfterSave(course);
		this._cdRef.markForCheck();
	}

	private _isEditMode(): boolean {
		return this.mode === CourseEditorMode.EDIT;
	}


	ngOnDestroy(): void {
		arrayUnsubscribe(this.subs);
	}
}