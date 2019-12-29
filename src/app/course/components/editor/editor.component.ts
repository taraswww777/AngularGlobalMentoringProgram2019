import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {CourseFormControl, TCourse} from "../../models/course";
import {CoursesService} from "../../services/CoursesService";

export enum CourseEditorMode {
	ADD = 'ADD',
	EDIT = 'EDIT',
}

@Component({
	selector: 'course-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss']
})
export class CourseEditorComponent implements OnInit {
	@Input() public mode: CourseEditorMode;
	@Input() public courseId?: number;
	@Input() public doAfterSave: (Course) => Promise<void> = Promise.resolve;

	public titleSubmit: string = 'Сохранить';
	public titleEditor: string = 'Создание';
	public course: CourseFormControl = new CourseFormControl();

	constructor(private _courseService: CoursesService) {
	}

	ngOnInit() {
		this.titleSubmit = this._isEditMode() ? 'Сохранить' : 'Создать';
		this.titleEditor = this._isEditMode() ? 'Редактирование' : 'Создание';

		if (this._isEditMode()) {
			this._courseService.getById(this.courseId).then((course: TCourse) => {
				this.course = new CourseFormControl(course);
			});
		}
	}


	public async onSubmit() {
		// TODO: update list/item course (maybe good for this use events)
		const course = this.course.toJsonObject();
		if (this._isEditMode()) {
			await this._courseService.update(this.courseId, course)
				.then((course: TCourse) => {
					console.log('CourseEditorComponent.onSubmit.course:', course);
				});
		} else {
			await this._courseService.add(course)
				.then((course: TCourse) => {
					console.log('CourseEditorComponent.onSubmit.course:', course);
				});
		}

		this.doAfterSave(course)
	}

	private _isEditMode(): boolean {
		return this.mode === CourseEditorMode.EDIT;
	}

}