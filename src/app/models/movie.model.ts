export class Movie {
    id: string;
    title: string;
    year: string;
    img: string;

    constructor(id: string, title: string, year: string, img: string) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.img = img;
    }
}