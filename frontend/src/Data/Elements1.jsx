const position = { x: 0, y: 0 };

const nodes = [
    {
        id: "1",
        type: "source",
        data: {
            title: "Check Key",
            description: "user’s signature",
            stats: {
                started: 0,
            },
        },
        position,
    },
    {
        id: "2",
        type: "invoce",
        data: {
            title: "100 or more blocks",
            description: "pass the test",
            stats: {
                running: 18,
                error: 1,
            },
        },
        position
    },
    {
        id: "3",
        type: "centerpricepayment",
        data: {
            title: "Check Key",
            description: "provided secret compare to a hash",
            stats: {
                running: 17,
            },
        },
        position: { x: 250, y: 200 },
    },
    {
        id: "4",
        type: "centerprice",
        data: {
            title: "100 or more blocks",
            description: "pass the test",
            stats: {
                running: 3,
            },
        },
        position: { x: 100, y: 300 },
    },
    {
        id: "6",
        type: "centerprice",
        data: {
            title: "Check Key",
            description: "user’s signature",
            stats: {
                running: 2,
            },
        },
        position
    },
    {
        id: "7",
        type: "end",
        data: {
            title: "End",
            description: "",
            stats: {
                running: 2,
            },
        },
        position
    },
];

const edges = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        type: "condition",
    },
    {
        id: "e2-3",
        source: "2",
        target: "3",
        type: "condition",
    },
    {
        id: "e3-4",
        source: "3",
        target: "4",
        type: "condition",
        data: {
            title: "Default condition",
            disabled: true,
        },
    },
    {
        id: "e3-5",
        source: "3",
        target: "5",
        type: "condition",
        data: {
            title: "Editable branch",
        },
    },
    {
        id: "e3-6",
        source: "4",
        target: "6",
        type: "condition",
    },
    {
        id: "e4-7",
        source: "6",
        target: "7",
        type: "condition",
        data: {
            title: "Editable branch",
        },
    },
];

export const initialElements = [...nodes, ...edges];
