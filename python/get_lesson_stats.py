import json

MIN_YEAR = 2019
MAX_YEAR = 2022

for year in range(MIN_YEAR,MAX_YEAR+1):
    result = {}

    with open('./data/' + str(year) + '/lessons_data.json') as f:
        data = json.load(f)
        result = {}
        result['data'] = []

        for lesson in data:
            
            min_grade = 20
            max_grade = 0
            sum = 0

            for entry in data[lesson]:
                grade = float(entry['grade'])
                min_grade = min(min_grade, grade)
                max_grade = max(max_grade, grade)
                sum += grade
            
            result['data'].append({'lesson':lesson,'min':min_grade,'max':max_grade,'avg':sum/len(data[lesson])})

    with open('./data/' + str(year) + '/minmax_data.json', 'w') as f:
        json.dump(result, f, indent=4,ensure_ascii=False)