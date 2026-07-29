let currentStage = 0;
let startTime = null;

const captchas = [
    {id: 1,
    title: "stage 1: prove you're human.",
    render: renderStage1
    },

    {id: 2,
    title: "stage 2: confirm intent.",
    render: renderStage2
    },

    {id: 3,
    title: "stage 3: easy trivia.",
    render: renderStage3
    }
];