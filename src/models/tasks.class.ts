export class Tasks {
    title: string;
    descreption: string;
    category: string;
    dueDate: number;
    priority: string;
    subtasks: string;

    constructor (obj?: any) {
        this.title = obj ? obj.title: '';
        this.descreption = obj ? obj.descreption : '';
        this.category = obj ? obj.category: '';
        this.dueDate = obj ? obj.dueDate: '';
        this.priority = obj ? obj.priority: '';
        this.subtasks = obj ? obj.subtasks: '';
    }

    public toJSON() {
        const tasksJson: any = {
    title: this.title,
    descreption: this.descreption,
    category: this.category,
    dueDate: this.dueDate,
    priority: this.priority,
    subtasks: this.subtasks,
        };


        for (const key in tasksJson) {
            if (tasksJson.hasOwnProperty(key) && tasksJson[key] === undefined) {
              delete tasksJson[key];
            }
          }
      
          return tasksJson;
    }
}