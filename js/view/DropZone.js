import KanbanAPI from "../api/KanbanAPI.js";
//import Column from "./Column.js";

//todo make it so Drag and drop from Dock does not delete original ?
export default class DropZone {
	static createDropZone() {
		const range = document.createRange();

		range.selectNode(document.body);

		const dropZone = range.createContextualFragment(`
			<div class="kanban__dropzone"></div>
		`).children[0];

		//causes the drop zone to appear if dragging item over
		dropZone.addEventListener("dragover", e => {
			e.preventDefault();
			dropZone.classList.add("kanban__dropzone--active");
		});

		//Number(columnElement.dataset.id) access column

		//removes backdrop
		dropZone.addEventListener("dragleave", () => {
			dropZone.classList.remove("kanban__dropzone--active");
		});

		dropZone.addEventListener("drop", e => {
			e.preventDefault();
			dropZone.classList.remove("kanban__dropzone--active"); //removes drop zone

			const columnElement = dropZone.closest(".kanban__column"); // get column info
			const columnId = Number(columnElement.dataset.id); //gets column number where dropped
			const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone")); //gets array of dropzones around object
			const droppedIndex = dropZonesInColumn.indexOf(dropZone); // locates where in dropzone array item dropped
			const itemId = Number(e.dataTransfer.getData("text/plain")); //gets item id

			const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`); //gets the html root of object
			const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;
			// ^this gets the html root of the item above it, this can either be an item or the drop zone

			if (droppedItemElement.contains(dropZone)) {
				return;
			}

			insertAfter.after(droppedItemElement);
			KanbanAPI.updateItem(itemId, {
				columnId,
				position: droppedIndex // updates json
			});
		});

		return dropZone;
	}
}
