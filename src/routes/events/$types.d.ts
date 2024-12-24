export type MyEvent = {
        event_id: string;
        title: string;
        description?: string;
        date?: string;
        expiry?: number;
        location?: string;
        status?: string;
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