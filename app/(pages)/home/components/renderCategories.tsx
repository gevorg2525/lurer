import classes from "../style/renderCategories.module.scss";
import { FC } from "react";
import NewsHeader from "@/app/components/topHeader/newsHeader";
import NewsItems from "@/app/components/news_items/newsItems";
import { NewsDataType } from "@/app/types/types";
import { useGetNewsQuery } from "@/app/redux/features/api/norKhosqkApi";
import NoData from "@/app/components/noData/noData";

interface Props {
    propsData: {
        id: number;
        name: string;
        name_eng: string;
    };
    lang: string;
}

const RenderCategories: FC<Props> = ({ propsData, lang }) => {
    const search: Record<string, any> = {
        lang,
    };

    const filter: Record<string, any> = {
        is_published: true,
        categoryId: 9,
    };

    const { data, isError, isLoading } = useGetNewsQuery({
        limit: 10,
        search: JSON.stringify(search),
        filter: JSON.stringify(filter),
    });

    if (isError) {
        return <div>Error loading news</div>;
    }

    if (isLoading) {
        return <div>...loading </div>;
    }

    if (isError) {
        return <div>Error loading news</div>;
    }

    const newsItems: NewsDataType[] = data?.message || [];
    return (
        <div className={classes.container}>
            <NewsHeader title={propsData.name_eng} />
            {newsItems[0] ? <NewsItems data={newsItems[0]} lang={lang} /> : <NoData />}
        </div>
    );
};

export default RenderCategories;
