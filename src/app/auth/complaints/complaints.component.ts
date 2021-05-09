import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interface/user';
import { AuthService } from '../../service/auth.service'


@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {
  private token;
  public userData:User;
  public status = "Pending Resolution"
  public type = "Type of complaint";
  public complaintTypes = ["Type of complaint", "Product Replacment", "Product Returns", "Product Repairs", "General Complaint", "Other"];
  public statusTypes = ["Pending Resolution", "Resolved", "Dismissed"]
  public complaintSubmitted;
  public complaintData = {};
  public complaintList = [
    {customerName: "Sam Smith", customerEmail:"samsmith@gmail.com", status: "Pending Resolution", title:"Computer Fix", description: "need to fix my computer as soon as possible", type:"Product Repairs"},
    {customerName: "James Smith", customerEmail:"jsmith@gmail.com", status: "Resolved", title:"Issues with my subscription", description: "I have been having issues with my subscription to your service and would like it to be resloved", type:"General Complaint"},
    {customerName: "Summer Bane", customerEmail:"sbain@gmail.com", status: "Pending Resolution", title:"Problem with Service", description: "I have a problem with your customer service", type:"Others"},
    {customerName: "Lucy liz", customerEmail:"lizlucy@gmail.com", status: "Dismissed", title:"Returning Phone", description: "I would like to return the new phone I recently bought from your service shop as its malfunctioning", type:"Product Returns"},

  ];

  constructor(private authService:AuthService, private toastrService: ToastrService) {
    this.token = localStorage.getItem('Token');
    this.userData =  JSON.parse(atob(this.token.split(".")[1]))
    this.complaintSubmitted = JSON.parse(localStorage.getItem('complaintSubmitted')) || false;
    this.complaintData = JSON.parse(localStorage.getItem('complaintData'));
    console.log(this.complaintSubmitted);
    console.log(this.userData);
  }

  logout() {
    this.authService.logout()
  }

  submitComplaint(form:NgForm) {
    if(this.type == "Type of complaint") {
      return
    }

    localStorage.setItem('complaintData', JSON.stringify(form.value));
    localStorage.setItem('complaintSubmitted', 'true');
    this.complaintData = form.value
    this.complaintSubmitted = true;
    console.log(form.value);
  }

  deleteComplaint() {
    localStorage.removeItem('complaintSubmitted');
    localStorage.removeItem('complaintData');
    this.complaintSubmitted = false;
    this.complaintData = {};
  }



  ngOnInit(): void {
  }

}
