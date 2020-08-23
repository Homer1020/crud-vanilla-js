import ValidateCamps from './modules/ValidateCamps.js';
import TaskLS from './modules/TaskLS.js';

new ValidateCamps('#button-add', '#title-task', '#desc-task');
new TaskLS('#form-add-task', '#button-add', '#title-task', '#desc-task', 'tasks', '#results');