export class Dates {
    dateName: string;
    datesDate: number;
    customIdDates: string;

    constructor (obj?: any) {
        this.dateName = obj ? obj.dateName: '';
        this.datesDate = obj ? obj.datesDate: '';
        this.customIdDates = obj ? obj.customIdDates : '';
    }


    public toJSON() {
        const datesJson: any = {
            dateName: this.dateName,
            customIdDates: this.customIdDates,
    datesDate: this.datesDate,
        };


        for (const key in datesJson) {
            if (datesJson.hasOwnProperty(key) && datesJson[key] === undefined) {
              delete datesJson[key];
            }
          }
      
          return datesJson;
    }

    toCalendarEvent() {
        return {
            title: this.dateName,
            date: this.datesDate // You might need to format this date to 'YYYY-MM-DD' format
        };
    }
}