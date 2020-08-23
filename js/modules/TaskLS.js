class TaskLS {
	constructor(form, buttonAdd, campTitle, campDesc, outputDataLS, outputDataHTML) {
		this.outputDataLS = outputDataLS;
		this.campTitle = document.querySelector(campTitle);
		this.buttonAdd = document.querySelector(buttonAdd);
		this.form = document.querySelector(form);
		this.campDesc = document.querySelector(campDesc);
		this.outputDataHTML = document.querySelector(outputDataHTML);
		this.addTask = this.addTask.bind(this);
		this.removeTask = this.removeTask.bind(this);
		this.updateTask = this.updateTask.bind(this);
		this.id = this.getId();
		this.showTasks();
		this.bindEvents();
	}
	getId() {
		const dataLS = this.getDataLS();
		if(dataLS.length > 0) {
			const ids = dataLS.map(data => data.id);
			const id = Math.max(...ids);
			return id + 1;
		}else {
			return 1;
		}
	}
	showTasks() {
		const dataLS = this.getDataLS();
		if(dataLS.length > 0) {
			let html = '';
			dataLS.forEach(task => {
				html += this.setTemplate(task.title, task.desc, task.id);
			});
			this.outputDataHTML.innerHTML = html;
		}
	}
	bindEvents() {
		this.form.addEventListener('submit', this.addTask);
		this.outputDataHTML.addEventListener('click', this.removeTask);
		this.outputDataHTML.addEventListener('click', this.updateTask);
	}
	setTemplate(titleValue, descValue, idValue) {
		return `
			<tr data-task-id="${idValue ? idValue : this.id}">
				<td>${titleValue}</td>
				<td>${descValue}</td>
				<td><a href="#" class="btn btn-danger delete">Eliminar</a></td>
				<td><a href="#" class="btn btn-warning update">Actualizar</a></td>
			</tr>
		`;
	}
	addTask(e) {
		e.preventDefault();
		const title = this.campTitle.value;
		const desc = this.campDesc.value;
		const newTask = this.setTemplate(title, desc);
		this.outputDataHTML.innerHTML += newTask;
		this.form.reset();
		this.buttonAdd.setAttribute('disabled', true);
		this.addTaskLS(this.id, title, desc);
		this.id++;
	}
	addTaskLS(id, title, desc) {
		const dataLS = this.getDataLS()
		dataLS.push({ id, title, desc });
		localStorage.setItem(this.outputDataLS, JSON.stringify(dataLS));
	}
	removeTask(e) {
		if(e.target.classList.contains('delete')) {
			e.preventDefault();
			const task = e.target.parentElement.parentElement;
			this.removeTaskLS(Number(task.dataset.taskId));
			task.remove();
		}
	}
	removeTaskLS(id) {
		const dataLS = this.getDataLS();
		dataLS.forEach((task, index) => {
			if(task.id === id) {
				dataLS.splice(index, 1);
			}
		})
		localStorage.setItem(this.outputDataLS, JSON.stringify(dataLS));
	}
	updateTask(e) {
		if(e.target.classList.contains('update')) {
			e.preventDefault();
			const task = e.target.parentElement.parentElement;
			const taskTitle = task.querySelector(':first-child');
			const taskDesc = task.querySelector(':nth-child(2)');
			if(!e.target.classList.contains('update-ok')) {
				e.target.style.display = 'block';
				e.target.style.width = '100%';
				e.target.style.textAlign = 'center';
				e.target.textContent = 'Listo';

				taskTitle.setAttribute('contenteditable', true);
				taskDesc.setAttribute('contenteditable', true);

				e.target.classList.remove('btn-warning');
				e.target.classList.add('btn-primary', 'update-ok');
			}else {

				this.updateTaskLS(Number(task.dataset.taskId), taskTitle.textContent, taskDesc.textContent);

				e.target.style.display = '';
				e.target.style.width = '';
				e.target.style.textAlign = '';
				e.target.textContent = 'Actualizar';

				taskTitle.removeAttribute('contenteditable');
				taskDesc.removeAttribute('contenteditable');

				e.target.classList.remove('btn-primary', 'update-ok');
				e.target.classList.add('btn-warning');
			}
		}
	}
	updateTaskLS(id, title, desc) {
		const dataLS = this.getDataLS();
		dataLS.forEach(task => {
			if(task.id === id) {
				task.title = title;
				task.desc = desc;
			}
		});
		localStorage.setItem(this.outputDataLS, JSON.stringify(dataLS));
	}
	getDataLS() {
		const data = localStorage.getItem(this.outputDataLS);
		if(data !== null) {
			return JSON.parse(data);
		}else {
			return [];
		}
	}
}

export default TaskLS;