import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})

export class ShoppingItemComponent implements OnInit {
  shoppingItemList: Item[] = [];

  constructor(private dataService: DataService) { }

  getItems(){
    this.dataService.getShoppingItems()
      .subscribe(items => {
        this.shoppingItemList = items;
        // console.log('data from DataService: ' + this.shoppingItemList[0].itemName);
      });
  }

  addItem(form){
    // console.log(form.value);
    let newItem: Item = {
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: false
    }
    this.dataService.addShoppingItem(newItem).subscribe(item => {
      console.log(item);
      this.getItems();
    });
  }

  deleteItem(id){
    this.dataService.deleteShoppingItem(id).subscribe(data => {
      console.log(data);
      if (data.n == 1){
        for (var i = 0; i < this.shoppingItemList.length; i++){
          if (id == this.shoppingItemList[i]._id){
            this.shoppingItemList.splice(i, 1);
          }
        }
      }
    });
  }

  ngOnInit() {
    this.getItems();
  }

}
