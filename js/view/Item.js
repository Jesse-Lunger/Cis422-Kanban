import DropZone from "./DropZone.js";
import KanbanAPI from "../api/KanbanAPI.js";

export default class Item {
	constructor(id, content, init=0) {
		const bottomDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(".kanban__item-input");
		this.elements.init = this.elements.root.querySelector(".kanban__init-input");

		this.elements.root.dataset.id = id;

		this.elements.input.textContent = content;
		this.elements.init.textContent = init;

		this.content = content;
		this.init = init;

		this.elements.root.appendChild(bottomDropZone);

		const onBlur = () => {
			const newContent = this.elements.input.textContent.trim();
			const newInit = this.elements.init.textContent.trim(); //modified

			
			if ((newContent == this.content) && (newInit == this.init)) {
				return;
			}

			this.content = newContent;
			this.init = newInit; //collects init

			KanbanAPI.updateItem(id, {
				content: this.content,
				init: this.init //updates new init when dragged
			});
		};




		this.elements.input.addEventListener("blur", onBlur); //updates if item.contents on changes
		this.elements.init.addEventListener("blur", onBlur); //updates if item.init changes

	
		this.elements.root.addEventListener("dblclick", () => {
			const check = confirm("Are you sure you want to delete this item?");

			if (check) {
				KanbanAPI.deleteItem(id);
				this.elements.input.removeEventListener("blur", onBlur);
				this.elements.root.parentElement.removeChild(this.elements.root);
			}
		});


		this.elements.root.addEventListener("dragstart", e => {
			e.dataTransfer.setData("text/plain", id);
		});

		this.elements.input.addEventListener("drop", e => {
			e.preventDefault();
		});
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban__item" draggable="true">
				name: <div class="kanban__item-input" contenteditable></div>
				init: <div class="kanban__init-input" contenteditable></div>
			</div>
			
		`).children[0];
	}

	// get deleteSelf(){
	// 	this.deleting();
	// }

	// *deleting(){
	// 	KanbanAPI.deleteItem(this.elements.root.dataset.id);
	// 	this.elements.input.removeEventListener("blur", onBlur);
	// 	this.elements.root.parentElement.removeChild(this.elements.root);
	// }
}

// const j = Item(1, "erer");
// j.deleting