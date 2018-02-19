export const monthNumToText = (num) => {
    switch(num){
        case 0: {
            return 'Январь';
        }
        case 1: {
            return 'Февраль';
        }
        case 2: {
            return 'Март';
        }
        case 3: {
            return 'Апрель';
        }
        case 4: {
            return 'Май';
        }
        case 5: {
            return 'Июнь';
        }
        case 6: {
            return 'Июль';
        }
        case 7: {
            return 'Август';
        }
        case 8: {
            return 'Сентябрь';
        }
        case 9: {
            return 'Октябрь';
        }
        case 10: {
            return 'Ноябрь';
        }
        case 11: {
            return 'Декабрь';
        }
        default: {
            throw new Error ('you argument is not valid, argument have to be more 0  less 11');
        }
    }
}

export const repeatTask = {
    everyDay: 1,
    everyWeek: 2,
    everyMonth: 3,
    everyYear: 4
}
