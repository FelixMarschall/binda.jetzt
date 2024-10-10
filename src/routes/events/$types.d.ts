export type MyEvent = {
        event_id: string;
        title: string;
        description?: string;
        date?: number;
        expiry?: number;
    };

export type MyEventsDocument = {
    id: string;
    events: MyEvent[],
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
};