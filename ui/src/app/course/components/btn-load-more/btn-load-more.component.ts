import { Component, Input, OnInit } from '@angular/core';
import { TCourse } from '../../models/course';

@Component({
	selector: 'courses-load-more',
	templateUrl: './btn-load-more.component.html',
	styleUrls: ['./btn-load-more.component.css']
})
export class CourseLoadMoreComponent implements OnInit {
	public showLoader: boolean = false;
	@Input()
	public listCourses: TCourse[] = [];

	ngOnInit() {
	}

	onLoadMore() {
		this.showLoader = true;
		//TODO: need support pagination in BE
		this.showLoader = false;
	}
}
