import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListService } from 'src/app/Service/product-list.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  result: any = [];
  selectedProduct: any;
  constructor(
    private route: ActivatedRoute,
    private products: ProductListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.products.getDataById(id).subscribe((data) => {
      this.selectedProduct = data;
    });
  }
  editProduct() {
    this.products.updateData(this.selectedProduct).subscribe((res) => {
      this.router.navigate(['/product-list']);
      this.products.getData().subscribe((data) => {
        this.result = data;
      });
    });
  }
}
