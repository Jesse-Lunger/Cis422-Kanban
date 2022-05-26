import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Boarding {
	constructor(id, title) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Boarding.createRoot();
		this.elements.title = this.elements.root.querySelector(".kanban__column-title");
		this.elements.items = this.elements.root.querySelector(".kanban__column-items");
		this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");
		this.elements.board = this.elements.root.querySelector(".kanban__board");

		this.elements.clearItems = this.elements.root.querySelector(".kanban__clear-items");



		this.elements.root.dataset.id = id;
		this.elements.title.textContent = title;
		this.elements.items.appendChild(topDropZone);

		// Allows user to add items to list
		this.elements.addItem.addEventListener("click", () => {
			const newItem = KanbanAPI.insertItem(id, "");

			this.renderItem(newItem);
		});
		this.elements.clearItems.addEventListener("click", () =>{
				
				//this.elements.items.firstElementChild;
			this.deleteColumn(id);
		})

		this.elements.board.addEventListener("click", () =>{
				
			this.pushToInitiative(3);
		})



		// renders saved data from json
		this.renderColumn(id);

		//this.pushToInitiative(3);
	}

	static createRoot() {

		//what's a range?
		//the "flexible" part of a webpage
		//boundary points from an inclusive starting pt and an exclusive ending pt
		//looks like [start, end)
		//Ranges set their starts and ends independently
		//the start of a range is .setStart(node, offset)
		//the end is nearly identical: .setEnd(node, offset)

		//when given a text node (i.e. html), it can perform certain actions, such as selecting
		//parts of a node (essentially specific letters since we're using text) or selecting entire nodes (which means entire words)

		//here we create a range to initialize the individual columns we see on the UI
		const range = document.createRange();

		//this sets our range to include all of this text node so that it'll always
		//be displayed
		//document.body is our reference node so that we can create the appropriately sized range
		//in short, this is where the .json is read (where relevant column info's stored)
		//and the range is created such that all of the read information'll fit in a single
		//column object
		range.selectNode(document.body);

		//visually fix the clear items button
		//when returned, a "fixed" column will appear on the UI, with centered text,
		//col title, preexisting items, and add button (from .css file)
		//the .createContextualFragment allows us to implement html code directly
		//so we don't have to clutter up the .css file
		return range.createContextualFragment(`
			<div class="kanban__column">
				<div class="kanban__column-title"></div>
				<div class="kanban__column-items"></div>
				<button class="kanban__add-item" type="button">+ Add</button>
				<button class="kanban__board" type="button">board</button>
				<button class="kanban__clear-items" type="button">clear</button>
			</div>
		`).children[0];
	}



	pushToInitiative(initColId){
		KanbanAPI.getItems(2).forEach(item => {
			KanbanAPI.insertItem(initColId, item.id, item.init);
		});
		//this.renderColumn(initColId);
		this.deleteColumn(2)	
	}

	renderItem(data) {
		const item = new Item(data.id, data.content, data.init);

		this.elements.items.appendChild(item.elements.root);
	}

	renderColumn(id){
		KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});
	}

	deleteColumn(id){
		KanbanAPI.getItems(id).forEach(item => {
			this.elements.items.removeChild(this.elements.items.lastElementChild);
			//this.elements.items.input.removeEventLister("blur", onBlur);
			KanbanAPI.deleteItem(item.id);
		})
		if (this.elements.items.hasChildNodes()){
		//this.elements.items.removeChild(this.elements.items.firstElementChild);
	}
}

}