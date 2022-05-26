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
			KanbanAPI.getItems(1).forEach(item1 => {
				// this.renderItem(item);
				// console.log(item.id);
				//KanbanAPI.deleteItem(item1.id);
				console.log(this.elements.root.dataset);
				
				//item.deleteSelf(item.id);
				//item.elements.input.removeEventListener("blur", onBlur);
				//item.elements.root.parentElement.removeChild(item.elements.root);

			})


		})


		// shows saved data from json
		KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});
	}

	static createRoot() {
		const range = document.createRange(); //look up createRange?

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban__column">
				<div class="kanban__column-title"></div>
				<div class="kanban__column-items"></div>
				<button class="kanban__add-item" type="button">+ Add</button>
				<button class="kanban__clear-items" type="button">clear</button>
			</div>
		`).children[0];
	}

	renderItem(data) {
		const item = new Item(data.id, data.content);

		this.elements.items.appendChild(item.elements.root);
	}
}