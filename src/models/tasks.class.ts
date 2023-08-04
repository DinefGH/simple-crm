export class Tasks {
    title: string;
    customIdTitle: string;
    descreption: string;
    category: string;
    dueDate: number;
    priority: string;
    subtasks: string;

    constructor (obj?: any) {
        this.title = obj ? obj.title: '';
        this.customIdTitle = obj ? obj.customIdTitle : '';
        this.descreption = obj ? obj.descreption : '';
        this.category = obj ? obj.category: '';
        this.dueDate = obj ? obj.dueDate || null : null;
        this.priority = obj ? obj.priority: '';
        this.subtasks = obj ? obj.subtasks: '';
    }

    public toJSON() {
        const tasksJson: any = {
    title: this.title,
    customIdTitle: this.customIdTitle,
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