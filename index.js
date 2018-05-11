const api = require('./helpers/api.js');
const file = require('./helpers/file.js')
const config = require('./config.js');

const ACCURACY_PERCENTAGE = 85;
const LEECH_THRESHOLD = 7;
const SENTENCES_FILE_NAME = 'sentences.txt';
const REVIEW_STATISTICS_ENDPOINT = 'reviewStatistics';
const ITEM_ENDPOINT = 'item';
const REVIEW_STATISTICS_PARAMETERS = `?percentages_less_than=${ACCURACY_PERCENTAGE}`;

const isLeech = reviewStatistic => {
    return (
        reviewStatistic.reading_max_streak > LEECH_THRESHOLD ||
        reviewStatistic.meaning_max_streak > LEECH_THRESHOLD
    );
};

const parseReviewStatistics = reviewStatistics => reviewStatistics.data.filter(statistic => isLeech(statistic.data));

const getItemsInfo = (items, apiV2Token, sessionToken, callEndCallback) => {
    if (items.length <= 0) {
        return callEndCallback();
    }

    let item = items.shift(),
        itemId = item.data.subject_id;

    api.callApi(ITEM_ENDPOINT, `/${itemId}`, apiV2Token).then(subject => {
        api.callInternalApi(`/${item.data.subject_type}/${itemId}`, sessionToken).then(item => {
            if (item && item.sentences && item.sentences[0]) {
                console.log(subject.data.slug);

                file.write(`
                    ${subject.data.slug}\t
                    ${item.sentences[0].join('\t')}
                    \n
                `);
            }
        })
        .then(() => getItemsInfo(items, apiV2Token, sessionToken, callEndCallback));
    });
};

const openSentencesFile = () => file.createStream(SENTENCES_FILE_NAME);

api.callApi(REVIEW_STATISTICS_ENDPOINT, REVIEW_STATISTICS_PARAMETERS, config.API_V2_TOKEN)
    .then(parseReviewStatistics)
    .then(openSentencesFile)
    .then(items => getItemsInfo(items, config.API_V2_TOKEN, config.SESSION_TOKEN, file.closeFile))
;