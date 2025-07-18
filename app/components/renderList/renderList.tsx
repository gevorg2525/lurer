import { FC } from "react";
import classes from "./renderList.module.scss";
import NewsHeader from "@/app/components/topHeader/newsHeader";
import NewsItems from "@/app/components/news_items/newsItems";
import { NewsDataType } from "@/app/types/types";
import { useGetNewsQuery } from "@/app/redux/features/api/norKhosqkApi";
import NoData from "../noData/noData";

interface Props {
    propsData: {
        id: number;
        name: string;
        name_eng: string;
    };
    lang: string;
}

const RenderList: FC<Props> = ({ propsData, lang }) => {
    const search: Record<string, any> = {
        lang,
    };

    const filter: Record<string, any> = {
        is_published: true,
        categoryId: 9,
    };

    const { data, isError, isLoading } = useGetNewsQuery({
        limit: 4,
        search: JSON.stringify(search),
        filter: JSON.stringify(filter),
    });

    if (isError) {
        return <div>Error loading news</div>;
    }

    if (isLoading) {
        return <div>...loading </div>;
    }

    if (data && data?.message.length == 0) {
        return <NoData />;
    }

    const newsItems: NewsDataType[] = data?.message || [];

    return (
        <div className={classes.container}>
            <NewsHeader title={propsData.name_eng} />
            {newsItems && (
                <div className={classes.list}>
                    {newsItems.map((el) => {
                        return <NewsItems key={el.id} data={el} lang={lang} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default RenderList;
