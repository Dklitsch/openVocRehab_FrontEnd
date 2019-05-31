export function isEmptyValidation(stateVar, stateFunction) {

    if (stateVar == "") {
        stateFunction(false);
        return false;
    }
    else {
        stateFunction(true);
        return true;
    }

}