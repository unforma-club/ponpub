type BaseData = {
    title?: string;
    description?: string;
};

export type BaseSiteData = BaseData & {
    meta?: {
        twitter: BaseData;
        facebook: BaseData;
    };
};
