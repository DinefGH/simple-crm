export class Dates {
    dateName: string;
    datesDate: number;
    customIdDates: string;
    timeValue: string;

    constructor (obj?: any) {
        this.dateName = obj ? obj.dateName: '';
        this.datesDate = obj ? obj.datesDate: '';
        this.customIdDates = obj ? obj.customIdDates : '';
        this.timeValue = obj ? obj.timeValue : '';
    }


    public toJSON() {
        const datesJson: any = {
            dateName: this.dateName,
            customIdDates: this.customIdDates,
    datesDate: this.datesDate,
    timeValue: this.timeValue,
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
            date: this.datesDate,
            timeValue: this.timeValue,
        };
    }
}