export class Tasks {
    title: string;
    customIdTitle: string;
    descreption: string;
    category: string;
    dueDate: number;
    priority: string;
    subtasks: string;
    status: string;

    constructor (obj?: any) {
        this.title = obj ? obj.title: '';
        this.customIdTitle = obj ? obj.customIdTitle : '';
        this.descreption = obj ? obj.descreption : '';
        this.category = obj ? obj.category: '';
        this.dueDate = obj ? obj.dueDate : '';
        this.priority = obj ? obj.priority: '';
        this.subtasks = obj ? obj.subtasks: '';
        this.status = obj ? obj.status: '';
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
    status: this.status,
        };


        for (const key in tasksJson) {
            if (tasksJson.hasOwnProperty(key) && tasksJson[key] === undefined) {
              delete tasksJson[key];
            }
          }
      
          return tasksJson;
    }

    toCalendarEvent() {
        return {
            title: this.title,
            date: this.dueDate,
        };
    }
}