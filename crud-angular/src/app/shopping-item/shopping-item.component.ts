import { Component, OnInit } from '@angular/core';
import { item } from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})

export class ShoppingItemComponent implements OnInit {
  shoppingItemList: item[] = [];

  constructor(private dataService: DataService) { }

  getItems(){
    this.dataService.getShoppingItems()
      .subscribe(items => {
        this.shoppingItemList = items;
        // console.log('data from DataService: ' + this.shoppingItemList[0].itemName);
      });
  }

  ngOnInit() {
    this.getItems();
  }

}
