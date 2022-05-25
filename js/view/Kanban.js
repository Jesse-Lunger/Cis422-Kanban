import Boarding from "./Boarding.js";
import Dock from "./Dock.js";
import InitList from "./InitList.js";


export default class Kanban {
	constructor(root) {
		this.root = root;

		//these consts are giving their respective .js files
		//the id and title required 
		const boardingView = new Boarding(1, "Boarding");
		const dockview = new Dock(2, "Dock");
		const initView = new InitList(3, "InitList");

		this.root.appendChild(boardingView.elements.root);
		this.root.appendChild(dockview.elements.root);
		this.root.appendChild(initView.elements.root);
	}

}
