//Redux actions for current User including calls to api file

import {userAPI} from '../api/api';

export var startMatch = () => {
    return {
        type: "START_MATCH"
    }
}
