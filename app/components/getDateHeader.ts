export const months = [
    { id: 1, arm: "Հունվար", eng: "January" },
    { id: 2, arm: "Փետրվար", eng: "February" },
    { id: 3, arm: "Մարտ", eng: "March" },
    { id: 4, arm: "Ապրիլ", eng: "April" },
    { id: 5, arm: "Մայիս", eng: "May" },
    { id: 6, arm: "Հունիս", eng: "June" },
    { id: 7, arm: "Հուլիս", eng: "July" },
    { id: 8, arm: "Օգոստոս", eng: "August" },
    { id: 9, arm: "Սեպտեմբեր", eng: "September" },
    { id: 10, arm: "Հոկտեմբեր", eng: "October" },
    { id: 11, arm: "Նոյեմբեր", eng: "November" },
    { id: 12, arm: "Դեկտեմբեր", eng: "December" },
];

export default function getDateHeader(lang: "arm" | "eng") {
    const dateObj = new Date();
    let year = dateObj.getFullYear();
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;

    let year1 = year < 10 ? "0" + year : year;
    let day1 = day < 10 ? "0" + day : day;
    let month1 = month < 10 ? "0" + month : month;

    return `${months[+month1 - 1][lang]} ${day1} ${year1}`;
}
