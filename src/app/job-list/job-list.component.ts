import { FilterService } from './../Data/filter.service';
import { data } from './../JobsData';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs = [];
  filterJobs;
  limit = 4;
  start = 0;
  end = 4;

  constructor(private filterService: FilterService, private router: Router) { }

  ngOnInit(): void {
    this.jobs = data;
    this.filterService.filterData.subscribe(filter => {
      console.log(filter);
      if (filter) {
        this.jobs = data.filter(value => {
          if (value.ctc >= filter.ctc) {
            if (this.checkTechnology(filter.technology, value.technology) &&
              this.checkRole(filter.roles, value.role) &&
              this.checkExperience(filter.experience, value.experience)) {
              return value;
            }
          }
        }
        );
        this.start = 0;
        this.end = this.limit;
      }
    });
  }

  checkTechnology(a, b): boolean {
    if (a.length) {
      return a.some(res => b.includes(res));
    }
    else {
      return true;
    }
  }

  checkRole(a, b): boolean {
    if (a.length) {
      return a.includes(b);
    } else {
      return true;
    }
  }
  checkExperience(a, b): boolean {
    if (a.length) {
      return a.includes(b);
    } else {
      return true;
    }
  }

  changePage(start): void {
    this.start = start;
    this.end = this.start + this.limit;
  }

  jobDetail(id): void {
    this.router.navigate([`detail/${id}`]);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.jobs = data;
  }

}