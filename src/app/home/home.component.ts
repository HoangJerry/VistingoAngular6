import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  query : string = "";
  results :any  = []; 
  fav_results:any  = []; 
  selected: Array<boolean> = []; 
  selected_num :number =0;
  constructor(private data : DataService) { 
    this.fav_results = JSON.parse(localStorage.getItem("fav_results"));
    if (!this.fav_results){
      this.fav_results=[];
    }
  }

  ngOnInit() {
  }

  onEnterSearch(){
  	this.data.getSearch(this.query).subscribe(
        (data) => {
        	this.results = data;
        });
    }
    onClickSave(value){
    	if (!this.fav_results.includes(value) && this.fav_results.filter(val => val.show.id==value.show.id).length===0) {
    		this.fav_results.push(value);
    	}
      localStorage.setItem("fav_results", JSON.stringify(this.fav_results));
    }

    onClickSelect(i){
      this.selected[i]=!this.selected[i];
      this.selected_num = this.selected.filter(Boolean).length; 
    }

    onClickDelete(){
      let temp = this.fav_results.filter((val,key) => !(this.selected[key]===true));
      this.selected=[];
      this.selected_num =0;
      this.fav_results = temp;
      localStorage.setItem("fav_results", JSON.stringify(this.fav_results));
    }
}

