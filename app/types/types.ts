export type GenericObject<T> = { [key: string]: T };

export interface NewsType {
    id: number;
    categoryId: number;
    title: string;
    description: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    images: {
        id: number;
        newsId: number;
        imagePath: string;
        createdAt: string;
        updatedAt: string;
    }[];
}

export interface NewsDataType {
    id: number;
    categoryId: number;
    title: string;
    title_eng: string;
    description: string;
    description_eng: string;
    key_words: string;
    image: string;
    important: boolean;
    is_published: boolean;
    is_bold: boolean;
    published_at: string;
    photo_report: boolean;
    link: string;
    lang: string;
    createdAt: string;
    updatedAt: string;
}

export interface FormInputsType {
    id?: Number;
    name?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    min?: number;
}

export interface StaffProps {
    id: number;
    name: string;
    surname: string;
    position: string;
    image: string;
}

export interface NewsProps {
    update_date: string;
    id: number;
    title: string;
    description: string;
    news_images: {
        id: number;
        path: string;
        newsId: number;
    }[];
}
export interface StatementProps {
    id: number;
    title: string;
    description: string;
    publication_images: {
        id: number;
        path: string;
        newsId: number;
    }[];
}
