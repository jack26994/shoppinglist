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
  selectedItem: Item;
  toggleForm: boolean = false;

  constructor(private dataService: DataService) { }

  getItems() {
    this.dataService.getShoppingItems()
      .subscribe(
        items => {
        this.shoppingItemList = items;
        // console.log('data from DataService: ' + this.shoppingItemList[0].itemName);
        },
        error => {
          //some code
        }
      );
  }

  addItem(form) {
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

  deleteItem(id) {
    this.dataService.deleteShoppingItem(id).subscribe(data => {
      console.log(data);
      this.getItems();
    });
  }

 /*  data => {
    console.log(data);
    if (data.n == 1) {
      for (var i = 0; i < this.shoppingItemList.length; i++){
        if (id == this.shoppingItemList[i]._id){
          this.shoppingItemList.splice(i, 1);
        }
      }
    }
  } */

  showEditForm(item) {
    this.selectedItem = item;
    this.togglingForm();
  }

  editItem(form) {
    let updateItem: Item = {
      _id: this.selectedItem._id,
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: this.selectedItem.itemBought
    }

    this.dataService.updateShoppingItem(updateItem)
      .subscribe(result => {
        console.log(`Original item to be updated with old values: ${result.itemQuantity}`);
        this.togglingForm();
        this.getItems();
      });
  }

  updateItemCheckbox(item) {
    item.itemBought = !item.itemBought;

    this.dataService.updateShoppingItem(item)
      .subscribe(result => {
        console.log(`Original checkbox value: ${result.itemBought}`)
        this.getItems();
      });
  }

  cancelUpdate() {
    this.togglingForm();
  }

  togglingForm() {
    this.toggleForm = !this.toggleForm;
  }

  ngOnInit() {
    this.getItems();
  }

}
