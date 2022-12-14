import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuListService } from 'src/app/Service/menu-list.service';
import { ProductListService } from 'src/app/Service/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  result :any = [];
  constructor(private foodproducts: ProductListService,private menu:MenuListService ,private router: Router) { }

  ngOnInit(): void {
    this.foodproducts.getData().subscribe((data)=>{
      this.result=data;
      console.log(this.result);
      
    })
  }

  deleteProduct(id:any)
  {
    this.foodproducts.deleteData(id).subscribe((res)=>{
      this.router.navigate(['/product-list']);
      this.foodproducts.getData().subscribe((data)=>{
        this.result=data;
      })
    })
  }
}
