import { data } from './../JobsData';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  jobs: any = {};
  id: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id);
    this.id = Number(this.route.snapshot.params.id);
    this.jobs = data.find(value => value.id === this.id);
  }

}
