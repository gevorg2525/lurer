const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function getMyDate(date: string) {
    const dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;

    let year1 = year < 10 ? "0" + year : year;
    let day1 = day < 10 ? "0" + day : day;
    let month1 = month < 10 ? "0" + month : month;

    return `${day1} ${month1} ${year1}`;
}
